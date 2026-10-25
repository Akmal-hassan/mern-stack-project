import mongoose from 'mongoose';

const inventoryTxSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true
    },
    sku: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['SALE', 'RESTOCK', 'RETURN_REFUND', 'CANCEL_RESTORE', 'MANUAL_ADJUSTMENT'],
      required: true,
      index: true
    },
    quantityDelta: {
      type: Number,
      required: true
    },
    previousStock: {
      type: Number,
      required: true
    },
    newStock: {
      type: Number,
      required: true
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      default: null,
      index: true
    },
    orderNumber: {
      type: String,
      default: null
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    reason: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

inventoryTxSchema.index({ product: 1, createdAt: -1 });

const InventoryTx = mongoose.models.InventoryTx || mongoose.model('InventoryTx', inventoryTxSchema);
export default InventoryTx;
