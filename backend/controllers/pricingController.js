import Pricing from '../models/Pricing.js';

// @desc    Fetch all pricing tiers
// @route   GET /api/pricing
// @access  Public
const getPricingTiers = async (req, res) => {
  try {
    const tiers = await Pricing.find({});
    res.json(tiers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createTier = async (req, res) => {
  const { tierName, price, currencySymbol, description, features, isFeatured } = req.body;
  const tier = new Pricing({ tierName, price, currencySymbol, description, features, isFeatured });
  try {
    const createdTier = await tier.save();
    res.status(201).json(createdTier);
  } catch (error) {
    res.status(400).json({ message: 'Error creating pricing tier' });
  }
};

// @desc    Update a pricing tier
// @route   PUT /api/pricing/:id
// @access  Private/Admin
const updateTier = async (req, res) => {
  const { tierName, price, currencySymbol, description, features, isFeatured } = req.body;
  const tier = await Pricing.findById(req.params.id);

  if (tier) {
    tier.tierName = tierName;
    tier.price = price;
    tier.currencySymbol = currencySymbol;
    tier.description = description;
    tier.features = features;
    tier.isFeatured = isFeatured;
    
    const updatedTier = await tier.save();
    res.json(updatedTier);
  } else {
    res.status(404).json({ message: 'Pricing tier not found' });
  }
};

// @desc    Delete a pricing tier
// @route   DELETE /api/pricing/:id
// @access  Private/Admin
const deleteTier = async (req, res) => {
  const tier = await Pricing.findById(req.params.id);

  if (tier) {
    await tier.deleteOne();
    res.json({ message: 'Pricing tier removed' });
  } else {
    res.status(404).json({ message: 'Pricing tier not found' });
  }
};

export { getPricingTiers, createTier, updateTier, deleteTier };
