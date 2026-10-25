import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hex: { type: String, default: '#000000' }
  },
  { _id: false }
);

const productVariantSchema = new mongoose.Schema(
  {
    storage: { type: String, required: true, trim: true },
    ptaStatus: {
      type: String,
      enum: ['PTA Approved', 'Non-PTA', 'Not Applicable'],
      required: true
    },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: 0, min: 0 }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      sparse: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: 200,
      index: true
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
      enum: ['Apple', 'Samsung', 'Google', 'Other'],
      default: 'Apple',
      index: true
    },
    series: {
      type: String,
      trim: true,
      default: '' // e.g., 'iPhone 16 Series', 'Galaxy S Series'
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
      default: 'iphone'
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'Selling price is required'],
      min: [0, 'Price must be non-negative'],
      index: true
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price must be non-negative'],
      default: 0
    },
    costPrice: {
      type: Number,
      min: [0, 'Cost price must be non-negative'],
      default: 0
    },
    image: {
      type: String,
      required: [true, 'Main product image URL is required'],
      trim: true
    },
    gallery: {
      type: [String],
      default: [],
      validate: {
        validator: (images) => images.length <= 3,
        message: 'A product can have no more than three images.'
      }
    },
    storageOptions: {
      type: [String],
      default: ['Standard']
    },
    variants: {
      type: [productVariantSchema],
      default: []
    },
    colors: {
      type: [colorSchema],
      default: []
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
      index: true
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0
    },
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    isSale: {
      type: Boolean,
      default: false
    },
    isNewProduct: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true,
      index: true
    },
    specifications: {
      type: Map,
      of: String,
      default: {}
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, flattenMaps: true },
    toObject: { virtuals: true, flattenMaps: true }
  }
);

// Virtual for id to match frontend expectation (id instead of _id)
productSchema.virtual('id').get(function () {
  return this.customId || this._id.toString();
});

// Compound indexes for high-throughput storefront queries
productSchema.index({ active: 1, category: 1, brand: 1, price: 1 });
productSchema.index({ active: 1, featured: -1, createdAt: -1 });
productSchema.index({ name: 'text', description: 'text', series: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
