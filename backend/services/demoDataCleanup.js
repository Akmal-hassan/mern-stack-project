import User from '../models/User.js';
import Order from '../models/Order.js';
import InventoryTx from '../models/InventoryTx.js';

const DEMO_ORDER_NUMBERS = ['BB-2026-948102', 'BB-2026-883921'];

export async function removeDemoSeedData() {
  const [orders, inventoryResult, userResult] = await Promise.all([
    Order.find({ orderNumber: { $in: DEMO_ORDER_NUMBERS } }).select('_id'),
    InventoryTx.deleteMany({ orderNumber: { $in: DEMO_ORDER_NUMBERS } }),
    User.deleteOne({ email: 'demo@bluebells.pk' })
  ]);

  const orderResult = await Order.deleteMany({ _id: { $in: orders.map((order) => order._id) } });
  const removedCount = inventoryResult.deletedCount + orderResult.deletedCount + userResult.deletedCount;
  if (removedCount) {
    console.log(`[Database] Removed ${removedCount} legacy demo accounts, orders, and inventory records.`);
  }
}
