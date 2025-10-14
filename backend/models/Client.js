const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'USA' }
  },
  measurements: {
    // Upper Body
    bust: Number,
    waist: Number,
    hips: Number,
    shoulders: Number,
    chest: Number,
    armLength: Number,
    armCircumference: Number,
    neckCircumference: Number,
    backWidth: Number,
    
    // Lower Body
    inseam: Number,
    outseam: Number,
    thigh: Number,
    knee: Number,
    calf: Number,
    ankle: Number,
    rise: Number,
    
    // Additional
    height: Number,
    weight: Number,
    shirtSize: String,
    pantSize: String,
    dressSize: String,
    shoeSize: String,
    
    notes: String,
    lastUpdated: { type: Date, default: Date.now }
  },
  photos: [{
    url: String,
    description: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  preferences: {
    fabricType: [String],
    colors: [String],
    style: String,
    notes: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'vip'],
    default: 'active'
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  lastOrderDate: Date,
  notes: String,
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
clientSchema.index({ email: 1 });
clientSchema.index({ phone: 1 });
clientSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('Client', clientSchema);

