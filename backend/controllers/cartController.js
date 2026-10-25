import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import { resolveProductVariant } from '../services/productVariantService.js';

async function findOrCreateCart(req) {
  // Persist the session ID so anonymous carts can be found on the next request.
  req.session.cartInitialized = true;
  const userId = req.session?.userId || null;
  const sessionId = req.sessionID || 'anon';

  let cart = null;
  if (userId) {
    cart = await Cart.findOne({ user: userId });
  }
  if (!cart) {
    cart = await Cart.findOne({ sessionId: sessionId });
  }
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      sessionId: sessionId,
      items: []
    });
  } else if (userId && !cart.user) {
    cart.user = userId;
    await cart.save();
  }

  return cart;
}

export async function getCart(req, res, next) {
  try {
    const cart = await findOrCreateCart(req);
    res.status(200).json({
      success: true,
      data: {
        items: cart.items,
        couponCode: cart.couponCode
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function addItem(req, res, next) {
  try {
    const {
      productId,
      quantity = 1,
      storage,
      ptaStatus,
      color = 'Default',
      colorHex = '#000000'
    } = req.body;

    const product = await Product.findOne({
      $or: [
        { customId: productId },
        ...(mongoose.isValidObjectId(productId) ? [{ _id: productId }] : [])
      ]
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }

    const variant = resolveProductVariant(product, storage, ptaStatus);
    if (product.variants.length && !variant) {
      return res.status(400).json({
        success: false,
        error: 'The selected storage and PTA option is not available for this product.'
      });
    }

    const selectedStorage = variant?.storage || storage || product.storageOptions?.[0] || 'Standard';
    const selectedPtaStatus = variant?.ptaStatus || ptaStatus || 'Not Applicable';
    const selectedPrice = variant?.price ?? product.price;
    const selectedOriginalPrice = variant?.originalPrice || product.originalPrice || 0;
    const cart = await findOrCreateCart(req);
    const cartItemId = `${product.customId || product._id}_${selectedStorage}_${selectedPtaStatus}_${color}`.replace(/\s+/g, '-');

    const existingIndex = cart.items.findIndex((i) => i.cartItemId === cartItemId);
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        cartItemId,
        productId: product.customId || product._id.toString(),
        productRef: product._id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: selectedPrice,
        originalPrice: selectedOriginalPrice,
        image: product.image,
        storage: selectedStorage,
        ptaStatus: selectedPtaStatus,
        color,
        colorHex,
        quantity: Math.max(1, Number(quantity))
      });
    }

    cart.lastAccessedAt = new Date();
    await cart.save();

    res.status(200).json({
      success: true,
      message: `Added "${product.name}" to cart.`,
      data: {
        items: cart.items,
        couponCode: cart.couponCode
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function updateQuantity(req, res, next) {
  try {
    const { productId: cartItemId } = req.params;
    const { delta } = req.body;

    const cart = await findOrCreateCart(req);
    const itemIndex = cart.items.findIndex((i) => i.cartItemId === cartItemId || i.productId === cartItemId);

    if (itemIndex > -1) {
      const newQty = cart.items[itemIndex].quantity + Number(delta);
      if (newQty > 0) {
        cart.items[itemIndex].quantity = newQty;
      } else {
        cart.items.splice(itemIndex, 1);
      }
      cart.lastAccessedAt = new Date();
      await cart.save();
    }

    res.status(200).json({
      success: true,
      data: {
        items: cart.items,
        couponCode: cart.couponCode
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function removeItem(req, res, next) {
  try {
    const { productId: cartItemId } = req.params;
    const cart = await findOrCreateCart(req);

    cart.items = cart.items.filter((i) => i.cartItemId !== cartItemId && i.productId !== cartItemId);
    cart.lastAccessedAt = new Date();
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart.',
      data: {
        items: cart.items,
        couponCode: cart.couponCode
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function clearCart(req, res, next) {
  try {
    const cart = await findOrCreateCart(req);
    cart.items = [];
    cart.couponCode = null;
    cart.lastAccessedAt = new Date();
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully.',
      data: { items: [], couponCode: null }
    });
  } catch (err) {
    next(err);
  }
}

export async function applyCoupon(req, res, next) {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: 'Coupon code is required.' });
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
      status: 'active'
    });

    if (!coupon) {
      return res.status(404).json({ success: false, error: 'Invalid or inactive promotional code.' });
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return res.status(400).json({ success: false, error: 'This coupon has expired.' });
    }

    const cart = await findOrCreateCart(req);
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (subtotal < (coupon.minSpend || 0)) {
      return res.status(400).json({
        success: false,
        error: `This coupon requires a minimum spend of Rs. ${coupon.minSpend.toLocaleString()}. Current cart subtotal: Rs. ${subtotal.toLocaleString()}`
      });
    }

    cart.couponCode = coupon.code;
    await cart.save();

    res.status(200).json({
      success: true,
      message: `Coupon "${coupon.code}" applied successfully!`,
      data: {
        coupon: {
          code: coupon.code,
          discountType: coupon.discountType,
          value: coupon.value,
          minSpend: coupon.minSpend,
          status: coupon.status,
          expiresAt: coupon.expiresAt,
          description: coupon.description
        }
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function removeCoupon(req, res, next) {
  try {
    const cart = await findOrCreateCart(req);
    cart.couponCode = null;
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Coupon removed.',
      data: {
        items: cart.items,
        couponCode: null
      }
    });
  } catch (err) {
    next(err);
  }
}
