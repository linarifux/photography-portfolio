import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
  tierName: { type: String, required: true },
  price: { type: Number, required: true },
  currencySymbol: { type: String, default: '$' },
  description: { type: String, required: true },
  features: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Pricing = mongoose.model('Pricing', pricingSchema);

export default Pricing;