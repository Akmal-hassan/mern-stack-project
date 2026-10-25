import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      index: true
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    adminEmail: {
      type: String,
      default: 'system'
    },
    targetType: {
      type: String,
      required: true
    },
    targetId: {
      type: String,
      default: null
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    ipAddress: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

auditLogSchema.index({ createdAt: -1 });

const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
