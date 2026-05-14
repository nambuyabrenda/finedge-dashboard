const express = require('express');
const router = express.Router();

// Pricing plans
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    period: 'month',
    features: [
      'Basic Analytics',
      '5 Reports/month',
      'Email Support',
      '1 User'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    period: 'month',
    popular: true,
    features: [
      'Advanced Analytics',
      'Unlimited Reports',
      'Priority Support',
      'API Access',
      '5 Users',
      'Custom Dashboards'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'month',
    features: [
      'Everything in Pro',
      'Custom Solutions',
      'Dedicated Support',
      'SLA Guarantee',
      'White Label',
      'Unlimited Users'
    ]
  }
];

// Get pricing plans
router.get('/plans', (req, res) => {
  res.json({ success: true, plans });
});

// Create checkout session
router.post('/create-checkout', async (req, res) => {
  try {
    const { planId } = req.body;
    
    // TODO: Integrate with Stripe
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({...});
    
    res.json({ 
      success: true, 
      message: 'Checkout ready for Stripe integration',
      planId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
