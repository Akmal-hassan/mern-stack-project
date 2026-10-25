import Order from '../models/Order.js';
import Product from '../models/Product.js';
import DailyAnalytics from '../models/DailyAnalytics.js';

export async function getDashboardMetrics() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Fetch orders
  const [
    allOrders,
    todayOrders,
    totalProducts,
    lowStockProducts,
    outOfStockProducts,
    recentOrdersList
  ] = await Promise.all([
    Order.find({}).lean(),
    Order.find({ createdAt: { $gte: startOfToday } }).lean(),
    Product.countDocuments({ active: true }),
    Product.countDocuments({ active: true, stock: { $gt: 0, $lte: 5 } }),
    Product.countDocuments({ active: true, stock: { $lte: 0 } }),
    Order.find({}).sort({ createdAt: -1 }).limit(6).lean()
  ]);

  // Qualifying orders: exclude Cancelled / Refunded
  const qualifyingOrders = allOrders.filter(
    (o) => o.status !== 'Cancelled' && o.status !== 'Refunded'
  );
  const qualifyingTodayOrders = todayOrders.filter(
    (o) => o.status !== 'Cancelled' && o.status !== 'Refunded'
  );

  // Totals
  const totalRevenue = qualifyingOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const todaySales = qualifyingTodayOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

  const totalCostOfGoods = qualifyingOrders.reduce((sum, o) => sum + (o.totalCost || 0), 0);
  const grossProfit = totalRevenue - totalCostOfGoods;

  const productsSoldToday = qualifyingTodayOrders.reduce((sum, o) => {
    return sum + (o.items || []).reduce((itemSum, item) => itemSum + (item.quantity || 0), 0);
  }, 0);

  const totalProductsSold = qualifyingOrders.reduce((sum, o) => {
    return sum + (o.items || []).reduce((itemSum, item) => itemSum + (item.quantity || 0), 0);
  }, 0);

  // Status breakdown
  const pendingCount = allOrders.filter(
    (o) => o.status === 'Processing' || o.status === 'Pending'
  ).length;
  const shippedCount = allOrders.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = allOrders.filter((o) => o.status === 'Delivered').length;
  const cancelledCount = allOrders.filter((o) => o.status === 'Cancelled').length;

  // Best-selling products aggregation
  const productSalesMap = {};
  for (const ord of qualifyingOrders) {
    for (const item of ord.items || []) {
      const pid = item.productId || item.product?.toString();
      if (!productSalesMap[pid]) {
        productSalesMap[pid] = {
          id: pid,
          name: item.name,
          brand: item.brand,
          category: item.category,
          image: item.image,
          unitsSold: 0,
          revenue: 0
        };
      }
      productSalesMap[pid].unitsSold += item.quantity || 0;
      productSalesMap[pid].revenue += (item.price || 0) * (item.quantity || 0);
    }
  }

  const bestSellingProducts = Object.values(productSalesMap)
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, 5);

  // Monthly breakdown for visual charts (last 6 months)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const monthlyData = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mIndex = d.getMonth();
    const y = d.getFullYear();
    const mName = monthNames[mIndex];

    const nextMonth = new Date(y, mIndex + 1, 1);

    const mOrders = qualifyingOrders.filter((o) => {
      const ordDate = new Date(o.createdAt);
      return ordDate >= d && ordDate < nextMonth;
    });

    const mSales = mOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    monthlyData.push({
      month: i === 0 ? `${mName} (Current)` : mName,
      amount: mSales,
      orders: mOrders.length
    });
  }

  // Calculate chart heights (proportional 0 to 100)
  const maxMonthlySales = Math.max(...monthlyData.map((m) => m.amount), 1);
  monthlyData.forEach((m) => {
    m.height = Math.max(15, Math.round((m.amount / maxMonthlySales) * 100));
  });

  // Category breakdown
  const categoryRevenue = {
    iphone: 0,
    samsung: 0,
    'apple-watch': 0,
    audio: 0,
    accessories: 0
  };
  const brandRevenue = new Map();

  qualifyingOrders.forEach((ord) => {
    ord.items?.forEach((item) => {
      const cat = (item.category || 'iphone').toLowerCase();
      const itemRev = (item.price || 0) * (item.quantity || 0);
      if (categoryRevenue[cat] !== undefined) {
        categoryRevenue[cat] += itemRev;
      } else {
        categoryRevenue.accessories += itemRev;
      }

      const brandKey = (item.brand || 'Other').trim().toLowerCase() || 'other';
      const existingBrand = brandRevenue.get(brandKey);
      brandRevenue.set(brandKey, {
        key: brandKey,
        name: existingBrand?.name || item.brand?.trim() || 'Other',
        amount: (existingBrand?.amount || 0) + itemRev
      });
    });
  });

  const totalCatRevenue = Object.values(categoryRevenue).reduce((a, b) => a + b, 0) || 1;
  const totalBrandRevenue = [...brandRevenue.values()].reduce((total, brand) => total + brand.amount, 0) || 1;
  const brandColors = ['#171717', '#FFC928', '#6B7280', '#2563EB', '#10B981'];
  const brandShare = [...brandRevenue.values()]
    .sort((a, b) => b.amount - a.amount)
    .map((brand, index) => ({
      ...brand,
      share: Math.round((brand.amount / totalBrandRevenue) * 100),
      color: brandColors[index % brandColors.length]
    }));

  const categoryShare = [
    { key: 'iphone', name: 'Apple iPhone', amount: categoryRevenue.iphone, share: Math.round((categoryRevenue.iphone / totalCatRevenue) * 100), color: '#171717' },
    { key: 'samsung', name: 'Samsung Galaxy', amount: categoryRevenue.samsung, share: Math.round((categoryRevenue.samsung / totalCatRevenue) * 100), color: '#FFC928' },
    { key: 'apple-watch', name: 'Apple Watch', amount: categoryRevenue['apple-watch'], share: Math.round((categoryRevenue['apple-watch'] / totalCatRevenue) * 100), color: '#6B7280' },
    { key: 'audio', name: 'Audio & Buds', amount: categoryRevenue.audio, share: Math.round((categoryRevenue.audio / totalCatRevenue) * 100), color: '#2563EB' },
    { key: 'accessories', name: 'Accessories', amount: categoryRevenue.accessories, share: Math.round((categoryRevenue.accessories / totalCatRevenue) * 100), color: '#10B981' }
  ];

  return {
    todaySales,
    totalRevenue,
    totalOrders: allOrders.length,
    pendingOrders: pendingCount,
    shippedOrders: shippedCount,
    completedOrders: deliveredCount,
    cancelledOrders: cancelledCount,
    productsSoldToday,
    totalProductsSold,
    totalProductsInInventory: totalProducts,
    lowStockProducts,
    outOfStockProducts,
    grossProfit,
    averageOrderValue: qualifyingOrders.length > 0 ? Math.round(totalRevenue / qualifyingOrders.length) : 0,
    recentOrders: recentOrdersList.map((order) => ({
      ...order,
      id: order.orderNumber
    })),
    bestSellingProducts,
    monthlyData,
    categoryShare,
    brandShare,
    lastUpdated: new Date()
  };
}

export async function recordDailySnapshot(targetDate = new Date()) {
  const dateStr = targetDate.toISOString().split('T')[0];
  const startOfDay = new Date(dateStr);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(dateStr);
  endOfDay.setHours(23, 59, 59, 999);

  const orders = await Order.find({
    createdAt: { $gte: startOfDay, $lte: endOfDay }
  }).lean();

  const qualifyingOrders = orders.filter((o) => o.status !== 'Cancelled' && o.status !== 'Refunded');
  const cancelledOrRefunded = orders.filter((o) => o.status === 'Cancelled' || o.status === 'Refunded');

  const grossSales = qualifyingOrders.reduce((sum, o) => sum + (o.subtotal || 0), 0);
  const discounts = qualifyingOrders.reduce((sum, o) => sum + (o.discountAmount || 0), 0);
  const shipping = qualifyingOrders.reduce((sum, o) => sum + (o.shippingFee || 0), 0);
  const netRevenue = qualifyingOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const cost = qualifyingOrders.reduce((sum, o) => sum + (o.totalCost || 0), 0);
  const productsSold = qualifyingOrders.reduce((sum, o) => {
    return sum + (o.items || []).reduce((itemSum, item) => itemSum + (item.quantity || 0), 0);
  }, 0);

  const refundTotal = cancelledOrRefunded.reduce((sum, o) => sum + (o.refundAmount || o.grandTotal || 0), 0);

  return DailyAnalytics.findOneAndUpdate(
    { date: dateStr, period: 'daily' },
    {
      date: dateStr,
      period: 'daily',
      orderCount: qualifyingOrders.length,
      productsSoldCount: productsSold,
      grossSales,
      discounts,
      shippingCollected: shipping,
      netRevenue,
      costOfGoodsSold: cost,
      grossProfit: netRevenue - cost,
      refundCount: cancelledOrRefunded.length,
      refundTotal,
      lastCalculatedAt: new Date()
    },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
  );
}
