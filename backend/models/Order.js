const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    required: true,
    enum: ['dress', 'suit', 'shirt', 'pants', 'blouse', 'skirt', 'jacket', 'alteration', 'other']
  },
  description: {
    type: String,
    required: true
  },
  fabric: String,
  color: String,
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  notes: String
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  items: [orderItemSchema],
  measurements: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  photos: [{
    url: String,
    description: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  pricing: {
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    tax: {
      type: Number,
      default: 0,
      min: 0
    },
    discount: {
      type: Number,
      default: 0,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'ready-for-fitting', 'completed', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'refunded'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  dates: {
    orderDate: {
      type: Date,
      default: Date.now
    },
    expectedDelivery: Date,
    fittingDate: Date,
    completedDate: Date,
    deliveredDate: Date
  },
  notes: String,
  internalNotes: String,
  statusHistory: [{
    status: String,
    comment: String,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    changedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    const date = new Date();
    this.orderNumber = `ORD-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Indexes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ client: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ 'dates.orderDate': -1 });

module.exports = mongoose.model('Order', orderSchema);

