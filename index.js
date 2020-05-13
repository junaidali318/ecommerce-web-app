const express = require('express');
const stripe = require('stripe')('sk_test_eCElD3okEB6s5fU8TU4dfjVH00BCrnQohe');
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}))

app.post('/buy', (req, res) =>{
    // res.redirect('/');
   

(async () =>{
    const charge = await stripe.charges.create({
    amount: 999,
    currency: 'usd',
    description: 'Example charge'
}).catch(() => {
    console.log('error');
});
if (charge){
    console.log('success')
}
})();

})
app.listen(5500);