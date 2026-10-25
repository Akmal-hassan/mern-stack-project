import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
      default: 'percentage'
    },
    value: {
      type: Number,
      required: true,
      min: 0
    },
    minSpend: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      index: true
    },
    description: {
      type: String,
      default: ''
    },
    expiresAt: {
      type: Date,
      default: null
    },
    usageCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

couponSchema.virtual('id').get(function () {
  return this._id.toString();
});

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
export default Coupon;
