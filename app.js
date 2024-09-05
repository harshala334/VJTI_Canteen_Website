const express = require('express');
const app = express();
const orderRoutes = require('./order.routes');

// Middleware to parse JSON request body
app.use(express.json());

// Use the order routes
app.use('/api', orderRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});