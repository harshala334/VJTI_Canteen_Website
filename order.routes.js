const express = require('express');
const router = express.Router();
const { saveOrder, getOrder } = require('./order.controller');

// Route to save order
router.post('/save-order', saveOrder);

// Route to fetch order
router.get('/order/:orderId', getOrder);

module.exports = router;