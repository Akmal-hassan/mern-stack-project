import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { calculateCartTotals } from '../utils/calculations';
import { useStore } from './StoreContext';
import api from '../services/api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { settings, addToast, currentUser } = useStore();

  const [cartItems, setCartItems] = useState(() => {
    return getStorageItem('bluebells_cart', []);
  });

  const [cartLoading, setCartLoading] = useState(true);
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [appliedCouponCode, setAppliedCouponCode] = useState(() => {
    return getStorageItem('bluebells_applied_coupon', null);
  });

  // Keep LocalStorage synchronized
  useEffect(() => {
    setStorageItem('bluebells_cart', cartItems);
  }, [cartItems]);

  useEffect(() => {
    setStorageItem('bluebells_applied_coupon', appliedCouponCode);
  }, [appliedCouponCode]);

  // Calculate totals
  const totals = calculateCartTotals(
    cartItems,
    activeCoupon,
    settings.standardShippingFee || 1500,
    settings.freeShippingThreshold || 50000
  );

  const updateCartFromResponse = (response) => {
    const items = response?.data?.items;
    if (Array.isArray(items)) {
      setCartItems(items.map((item) => ({
        ...item,
        id: item.id || item.productId
      })));
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadCart() {
      setCartLoading(true);
      try {
        const response = await api.cart.get();
        if (!isMounted) return;
        updateCartFromResponse(response);
        const couponCode = response.data?.couponCode || null;
        setAppliedCouponCode(couponCode);
        if (couponCode) {
          const couponResponse = await api.cart.applyCoupon(couponCode);
          if (isMounted) setActiveCoupon(couponResponse.data?.coupon || null);
        } else {
          setActiveCoupon(null);
        }
      } catch (err) {
        console.warn('[Cart] Could not load server cart, using cached cart:', err.message);
      } finally {
        if (isMounted) setCartLoading(false);
      }
    }

    loadCart();
    return () => {
      isMounted = false;
    };
  }, [currentUser?._id, currentUser?.email]);

  const addToCart = async (product, quantity = 1, storage = null, color = null, colorHex = null, ptaStatus = null) => {
    const selectedStorage = storage || (product.storageOptions && product.storageOptions[0]) || 'Standard';
    const selectedColor = color || (product.colors && product.colors[0]?.name) || 'Default';
    const selectedColorHex = colorHex || (product.colors && product.colors[0]?.hex) || '#171717';
    const selectedPtaStatus = ptaStatus || (product.variants?.find((v) => v.storage === selectedStorage)?.ptaStatus) || 'Not Applicable';

    const cartItemId = `${product.id}_${selectedStorage}_${selectedPtaStatus}_${selectedColor}`.replace(/\s+/g, '-');
    const variant = product.variants?.find((v) => v.storage === selectedStorage && v.ptaStatus === selectedPtaStatus);
    const selectedPrice = variant?.price ?? product.price;
    const selectedOriginalPrice = variant?.originalPrice || product.originalPrice || 0;

    // Instant optimistic update (0ms perceived latency!)
    const optimisticItem = {
      cartItemId,
      id: product.id,
      productId: product.id,
      name: product.name,
      brand: product.brand || '',
      category: product.category || '',
      price: selectedPrice,
      originalPrice: selectedOriginalPrice,
      image: product.image || (product.gallery && product.gallery[0]) || '',
      storage: selectedStorage,
      ptaStatus: selectedPtaStatus,
      color: selectedColor,
      colorHex: selectedColorHex,
      quantity: Math.max(1, Number(quantity))
    };

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.cartItemId === cartItemId || (i.productId === product.id && i.storage === selectedStorage && i.color === selectedColor)
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + Number(quantity)
        };
        return updated;
      }
      return [optimisticItem, ...prev];
    });

    addToast('Added to cart!', 'success');

    // Background sync with server
    try {
      const response = await api.cart.addItem({
        productId: product.id,
        quantity,
        storage: selectedStorage,
        ptaStatus: selectedPtaStatus,
        color: selectedColor,
        colorHex: selectedColorHex
      });
      updateCartFromResponse(response);
      return true;
    } catch (err) {
      console.warn('[Cart] Server add item sync failed; saved locally:', err.message);
      return true;
    }
  };

  const updateQuantity = async (cartItemId, delta) => {
    // Instant optimistic quantity update
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId || item.productId === cartItemId || item.id === cartItemId) {
            const newQty = item.quantity + Number(delta);
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });

    try {
      const response = await api.cart.updateQuantity(cartItemId, delta);
      updateCartFromResponse(response);
    } catch (err) {
      console.warn('[Cart] Server update quantity failed; saved locally:', err.message);
    }
  };

  const removeFromCart = async (cartItemId) => {
    // Instant optimistic deletion
    setCartItems((prev) =>
      prev.filter((item) => item.cartItemId !== cartItemId && item.productId !== cartItemId && item.id !== cartItemId)
    );
    addToast('Item removed from cart', 'info');

    try {
      const response = await api.cart.removeItem(cartItemId);
      updateCartFromResponse(response);
    } catch (err) {
      console.warn('[Cart] Server remove item failed; saved locally:', err.message);
    }
  };

  const clearCart = async () => {
    try {
      const response = await api.cart.clear();
      updateCartFromResponse(response);
      setAppliedCouponCode(null);
      setActiveCoupon(null);
    } catch (err) {
      addToast(err.message || 'Could not clear cart', 'error');
    }
  };

  const applyCoupon = async (code) => {
    if (!code || !code.trim()) {
      addToast('Please enter a promo code', 'error');
      return false;
    }
    const cleanCode = code.trim().toUpperCase();
    try {
      const response = await api.cart.applyCoupon(cleanCode);
      setActiveCoupon(response.data?.coupon || null);
      setAppliedCouponCode(cleanCode);
      addToast(response.message || `Promo code "${cleanCode}" applied successfully!`, 'success');
      return true;
    } catch (err) {
      addToast(err.message || `Promo code "${cleanCode}" could not be applied`, 'error');
      return false;
    }
  };

  const removeCoupon = async () => {
    try {
      const response = await api.cart.removeCoupon();
      updateCartFromResponse(response);
      setAppliedCouponCode(null);
      setActiveCoupon(null);
      addToast('Promo code removed', 'info');
    } catch (err) {
      addToast(err.message || 'Could not remove promo code', 'error');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLoading,
        appliedCoupon: activeCoupon,
        appliedCouponCode,
        totals,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
