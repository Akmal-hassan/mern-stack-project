/**
 * Bluebells Firebase to Supabase Data Migration Script
 *
 * This utility script migrates existing Firebase Firestore collections
 * (Products, Orders, Customers/Profiles, Discounts, Store Settings)
 * into the normalized Supabase PostgreSQL database schema.
 *
 * Usage:
 *   node scripts/migrateFirebaseToSupabase.js [--source=path/to/firebase-export.json]
 *
 * Requirements:
 *   SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
 *   configured in environment or .env file.
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple native .env loader without external dependencies
function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Missing Supabase credentials.");
  console.error("Please define SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in your .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

// Helper to convert Firestore timestamp format to ISO string
function toIsoDate(val) {
  if (!val) return new Date().toISOString();
  if (typeof val === "string") return val;
  if (val._seconds) return new Date(val._seconds * 1000).toISOString();
  if (val.seconds) return new Date(val.seconds * 1000).toISOString();
  if (val.toDate && typeof val.toDate === "function") return val.toDate().toISOString();
  return new Date().toISOString();
}

/**
 * Migrate Products Collection
 */
async function migrateProducts(products) {
  console.log(`\n📦 Migrating ${products.length} products...`);
  let successCount = 0;

  for (const p of products) {
    const payload = {
      id: p.id,
      name: p.name,
      sku: p.sku || `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      category: p.category || "iphone",
      model: p.model || null,
      generation: p.generation || null,
      description: p.description || null,
      price: Number(p.price) || 0,
      sale_price: p.salePrice ? Number(p.salePrice) : null,
      currency: p.currency || "PKR",
      stock: Number(p.stock) || 0,
      low_stock_threshold: Number(p.lowStockThreshold) || 3,
      primary_image: p.primaryImage || p.image || null,
      images: Array.isArray(p.images) ? p.images : [],
      colors: Array.isArray(p.colors) ? p.colors : [],
      storage_options: Array.isArray(p.storageOptions) ? p.storageOptions : [],
      watch_sizes: Array.isArray(p.watchSizes) ? p.watchSizes : [],
      connectivity: Array.isArray(p.connectivity) ? p.connectivity : [],
      featured: Boolean(p.featured),
      status: p.status || "active",
      specifications: typeof p.specifications === "object" ? p.specifications : {},
      created_at: toIsoDate(p.createdAt),
      updated_at: toIsoDate(p.updatedAt)
    };

    const { error } = await supabase.from("products").upsert(payload, { onConflict: "id" });
    if (error) {
      console.warn(`  ⚠️ Failed to migrate product ${p.name} (${p.id}):`, error.message);
    } else {
      successCount++;
    }
  }

  console.log(`✅ Products migration finished: ${successCount}/${products.length} migrated successfully.`);
}

/**
 * Migrate Customer Profiles
 */
async function migrateProfiles(profiles) {
  console.log(`\n👤 Migrating ${profiles.length} profiles...`);
  let successCount = 0;

  for (const pr of profiles) {
    const payload = {
      id: pr.id,
      full_name: pr.fullName || pr.name || "Customer",
      email: pr.email || null,
      phone: pr.phone || null,
      role: pr.role || "customer",
      shipping_address: pr.shippingAddress || null,
      avatar_url: pr.avatarUrl || null,
      created_at: toIsoDate(pr.createdAt),
      updated_at: toIsoDate(pr.updatedAt)
    };

    const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
    if (error) {
      console.warn(`  ⚠️ Failed to migrate profile ${pr.email || pr.id}:`, error.message);
    } else {
      successCount++;
    }
  }

  console.log(`✅ Profiles migration finished: ${successCount}/${profiles.length} migrated successfully.`);
}

/**
 * Migrate Orders and Order Items
 */
async function migrateOrders(orders) {
  console.log(`\n🧾 Migrating ${orders.length} orders...`);
  let ordersCount = 0;
  let itemsCount = 0;

  for (const o of orders) {
    const orderPayload = {
      id: o.id,
      order_number: o.orderNumber || `BB-${Date.now()}`,
      user_id: o.userId || null,
      customer_name: o.customer?.fullName || o.customerName || "Customer",
      customer_email: o.customer?.email || o.customerEmail || "customer@example.com",
      customer_phone: o.customer?.phone || o.customerPhone || "N/A",
      shipping_address: o.shippingAddress || {},
      subtotal: Number(o.subtotal) || 0,
      shipping_charge: Number(o.shippingCharge || o.shippingCost) || 0,
      discount_amount: Number(o.discountAmount || o.discount) || 0,
      coupon_code: o.couponCode || null,
      total_amount: Number(o.totalAmount || o.total) || 0,
      currency: o.currency || "PKR",
      payment_method: o.paymentMethod || "cod",
      payment_status: o.paymentStatus || "pending",
      order_status: o.orderStatus || o.status || "processing",
      notes: o.notes || o.customerNotes || null,
      created_at: toIsoDate(o.createdAt),
      updated_at: toIsoDate(o.updatedAt)
    };

    const { error: orderError } = await supabase.from("orders").upsert(orderPayload, { onConflict: "id" });
    if (orderError) {
      console.warn(`  ⚠️ Failed to migrate order ${o.id}:`, orderError.message);
      continue;
    }
    ordersCount++;

    // Migrate nested items
    const rawItems = o.items || [];
    for (const item of rawItems) {
      const itemPayload = {
        order_id: o.id,
        product_id: item.productId || item.id || null,
        product_name: item.productName || item.name || "Apple Product",
        sku: item.sku || "SKU-N/A",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        color: item.color || null,
        storage: item.storage || null,
        watch_size: item.watchSize || null,
        connectivity: item.connectivity || null,
        image_url: item.image || item.imageUrl || null,
        subtotal: (Number(item.price) || 0) * (Number(item.quantity) || 1)
      };

      const { error: itemError } = await supabase.from("order_items").insert(itemPayload);
      if (itemError) {
        console.warn(`    ⚠️ Failed to insert order item for order ${o.id}:`, itemError.message);
      } else {
        itemsCount++;
      }
    }
  }

  console.log(`✅ Orders migration finished: ${ordersCount}/${orders.length} orders, ${itemsCount} items.`);
}

/**
 * Migrate Discounts and Store Settings
 */
async function migrateSettingsAndDiscounts(settings, discounts) {
  if (settings) {
    console.log("\n⚙️ Migrating Store Settings...");
    const { error } = await supabase.from("store_settings").upsert({
      id: "global",
      store_name: settings.storeName || "Bluebells",
      store_email: settings.storeEmail || "support@bluebells.com",
      store_phone: settings.storePhone || "+92 300 1234567",
      currency: settings.currency || "PKR",
      currency_symbol: settings.currencySymbol || "Rs. ",
      free_shipping_threshold: Number(settings.freeShippingThreshold) || 50000,
      standard_shipping_rate: Number(settings.standardShippingRate) || 1500,
      tax_rate_percent: Number(settings.taxRatePercent) || 0,
      inventory_low_threshold: Number(settings.inventoryLowThreshold) || 3,
      updated_at: new Date().toISOString()
    }, { onConflict: "id" });

    if (error) console.warn("  ⚠️ Settings migration error:", error.message);
    else console.log("  ✅ Store settings migrated successfully.");
  }

  if (Array.isArray(discounts) && discounts.length > 0) {
    console.log(`\n🎟️ Migrating ${discounts.length} discount coupons...`);
    for (const d of discounts) {
      const { error } = await supabase.from("discounts").upsert({
        code: d.code.toUpperCase(),
        discount_percent: Number(d.discountPercent) || 0,
        discount_amount: Number(d.discountAmount) || 0,
        type: d.type || "percentage",
        min_order_amount: Number(d.minOrderAmount) || 0,
        max_discount_amount: d.maxDiscountAmount ? Number(d.maxDiscountAmount) : null,
        usage_limit: d.usageLimit ? Number(d.usageLimit) : null,
        used_count: Number(d.usedCount) || 0,
        active: Boolean(d.active ?? true),
        expires_at: d.expiresAt ? toIsoDate(d.expiresAt) : null,
        created_at: toIsoDate(d.createdAt)
      }, { onConflict: "code" });

      if (error) console.warn(`  ⚠️ Failed to migrate discount ${d.code}:`, error.message);
    }
    console.log("  ✅ Discounts migrated.");
  }
}

/**
 * Main Execution
 */
async function run() {
  console.log("🚀 Starting Bluebells Firebase -> Supabase Migration Utility");
  console.log(`Target Supabase URL: ${supabaseUrl}`);

  // Test connection
  const { data: ping, error: pingErr } = await supabase.from("products").select("id").limit(1);
  if (pingErr) {
    console.error("❌ Connection failed to Supabase PostgreSQL database:", pingErr.message);
    console.error("Ensure SQL migration `supabase/migrations/20261021000000_init_schema.sql` has been executed on the target database.");
    process.exit(1);
  }
  console.log("✅ Supabase database connection verified!");

  // Check for source file argument or default export
  const args = process.argv.slice(2);
  let sourceFilePath = null;
  const sourceArg = args.find((a) => a.startsWith("--source="));
  if (sourceArg) {
    sourceFilePath = sourceArg.split("=")[1];
  }

  let exportData = null;
  if (sourceFilePath && fs.existsSync(sourceFilePath)) {
    console.log(`📂 Reading Firebase export from: ${sourceFilePath}`);
    exportData = JSON.parse(fs.readFileSync(sourceFilePath, "utf8"));
  } else {
    console.log("ℹ️ No external JSON export supplied. Using sample migration data verification.");
    exportData = {
      products: [],
      profiles: [],
      orders: [],
      discounts: [
        { code: "APPLE10", discountPercent: 10, type: "percentage", active: true, minOrderAmount: 50000 },
        { code: "BLUEBELLS5", discountPercent: 5, type: "percentage", active: true, minOrderAmount: 20000 }
      ],
      settings: {
        storeName: "Bluebells",
        storeEmail: "concierge@bluebells.store",
        currency: "PKR",
        currencySymbol: "Rs. ",
        freeShippingThreshold: 100000,
        standardShippingRate: 2000
      }
    };
  }

  if (exportData.products && exportData.products.length > 0) {
    await migrateProducts(exportData.products);
  }
  if (exportData.profiles && exportData.profiles.length > 0) {
    await migrateProfiles(exportData.profiles);
  }
  if (exportData.orders && exportData.orders.length > 0) {
    await migrateOrders(exportData.orders);
  }
  if (exportData.settings || exportData.discounts) {
    await migrateSettingsAndDiscounts(exportData.settings, exportData.discounts);
  }

  console.log("\n🎉 Bluebells Backend Migration process completed successfully!");
}

run().catch((err) => {
  console.error("❌ Fatal error during migration:", err);
  process.exit(1);
});
