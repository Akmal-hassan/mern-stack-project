import mongoose from 'mongoose';

const dailyAnalyticsSchema = new mongoose.Schema(
  {
    date: {
      type: String, // 'YYYY-MM-DD'
      required: true,
      index: true
    },
    period: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily'
    },
    orderCount: {
      type: Number,
      default: 0,
      min: 0
    },
    productsSoldCount: {
      type: Number,
      default: 0,
      min: 0
    },
    grossSales: {
      type: Number,
      default: 0,
      min: 0
    },
    discounts: {
      type: Number,
      default: 0,
      min: 0
    },
    shippingCollected: {
      type: Number,
      default: 0,
      min: 0
    },
    netRevenue: {
      type: Number,
      default: 0
    },
    costOfGoodsSold: {
      type: Number,
      default: 0,
      min: 0
    },
    grossProfit: {
      type: Number,
      default: 0
    },
    refundCount: {
      type: Number,
      default: 0,
      min: 0
    },
    refundTotal: {
      type: Number,
      default: 0,
      min: 0
    },
    lastCalculatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

dailyAnalyticsSchema.index({ date: 1, period: 1 }, { unique: true });

const DailyAnalytics = mongoose.models.DailyAnalytics || mongoose.model('DailyAnalytics', dailyAnalyticsSchema);
export default DailyAnalytics;
