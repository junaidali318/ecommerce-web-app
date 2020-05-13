const stripe = require('stripe')('sk_test_eCElD3okEB6s5fU8TU4dfjVH00BCrnQohe');

// Token is created using Stripe Checkout or Elements!
// Get the payment token ID submitted by the form:
const token = request.body.stripeToken; // Using Express

const charge = await stripe.charges.create({
    amount: 999,
    currency: 'usd',
    description: 'Example charge',
    source: token,
});