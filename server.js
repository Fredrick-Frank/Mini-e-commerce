const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

// In-memory product database
const products = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 150 },
  { id: 3, name: 'Product C', price: 200 },
];

// In-memory cart
let cart = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { products });
});

app.post('/add-to-cart', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.body.productId));
  if (product) {
    cart.push(product);
  }
  res.redirect('/');
});

app.get('/cart', (req, res) => {
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  res.render('cart', { cart, total });
});

app.post('/checkout', (req, res) => {
  cart = []; // Clear the cart after checkout
  res.send('Checkout complete! Thank you for your purchase.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
