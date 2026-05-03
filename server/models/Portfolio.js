const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: 'My Portfolio'
  },
  assets: [{
    symbol: {
      type: String,
      required: true,
      uppercase: true
    },
    name: String,
    type: {
      type: String,
      enum: ['stock', 'bond', 'crypto', 'etf', 'mutual_fund', 'real_estate', 'commodity'],
      default: 'stock'
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    purchasePrice: {
      type: Number,
      required: true,
      min: 0
    },
    currentPrice: {
      type: Number,
      min: 0
    }
  }],
  totalValue: {
    type: Number,
    default: 0
  },
  totalInvested: {
    type: Number,
    default: 0
  },
  dayChange: {
    type: Number,
    default: 0
  },
  dayChangePercent: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate portfolio metrics before saving
portfolioSchema.pre('save', function(next) {
  this.totalInvested = this.assets.reduce((sum, asset) => 
    sum + (asset.purchasePrice * asset.quantity), 0);
  
  this.totalValue = this.assets.reduce((sum, asset) => 
    sum + ((asset.currentPrice || asset.purchasePrice) * asset.quantity), 0);
  
  this.dayChange = this.totalValue - this.totalInvested;
  this.dayChangePercent = this.totalInvested > 0 ? 
    ((this.dayChange / this.totalInvested) * 100) : 0;
  
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
