import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false // never returned in queries unless explicitly requested
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      index: true
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'pending'],
      default: 'active'
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    address: {
      type: String,
      trim: true,
      default: ''
    },
    city: {
      type: String,
      trim: true,
      default: ''
    },
    state: {
      type: String,
      trim: true,
      default: ''
    },
    postalCode: {
      type: String,
      trim: true,
      default: ''
    },
    lastLoginAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook: Hash password with bcryptjs before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method: Compare input password with stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Safe JSON transform: remove password and __v
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
