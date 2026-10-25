import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productId: {
      type: String,
      required: true // original string or customId (e.g. 'iphone-16-pro-max')
    },
    name: { type: String, required: true },
    brand: { type: String, default: '' },
    category: { type: String, default: '' },
    image: { type: String, default: '' },
    storage: { type: String, default: 'Standard' },
    ptaStatus: { type: String, default: 'Not Applicable' },
    color: { type: String, default: 'Default' },
    colorHex: { type: String, default: '#000000' },
    price: {
      type: Number,
      required: [true, 'Price at purchase time is required'],
      min: 0
    },
    costPrice: {
      type: Number,
      default: 0,
      min: 0
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1']
    },
    itemTotal: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const customerDetailsSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, default: '' },
    postalCode: { type: String, default: '' }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      default: null
    },
    customer: {
      type: customerDetailsSchema,
      required: true
    },
    items: {
      type: [orderItemSchema],
      validate: [(val) => val.length > 0, 'Order must contain at least one item']
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    shippingFee: {
      type: Number,
      default: 0,
      min: 0
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    couponCode: {
      type: String,
      default: null
    },
    grandTotal: {
      type: Number,
      required: true,
      min: 0
    },
    totalCost: {
      type: Number,
      default: 0,
      min: 0
    },
    grossProfit: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'],
      default: 'Processing',
      index: true
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
      index: true
    },
    paymentMethod: {
      type: String,
      enum: ['cod'],
      default: 'cod'
    },
    shippingMethod: {
      type: String,
      default: 'express'
    },
    notes: {
      type: String,
      default: ''
    },
    cancelledAt: {
      type: Date,
      default: null
    },
    cancelReason: {
      type: String,
      default: null
    },
    refundAmount: {
      type: Number,
      default: 0
    },
    refundedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual id to match frontend expectation (order.id)
orderSchema.virtual('id').get(function () {
  return this.orderNumber;
});

// Compound indexes for fast admin querying and filtering
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ 'customer.email': 1, createdAt: -1 });
orderSchema.index({ user: 1, createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
