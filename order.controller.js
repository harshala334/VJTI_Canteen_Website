const fs = require('fs');
const path = require('path');

// Function to save the order as a JSON file
const saveOrder = (req, res) => {
    const orderData = req.body;

    // Define the file path where the JSON will be saved
    const filePath = path.join(__dirname, '..', 'orders', `order_${orderData.orderId}.json`);

    // Write the order data to a JSON file
    fs.writeFile(filePath, JSON.stringify(orderData, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving order data', error: err });
        }
        res.status(200).json({ message: 'Order saved successfully' });
    });
};

// Function to fetch the saved order data
const getOrder = (req, res) => {
    const orderId = req.params.orderId;

    // Define the file path to fetch the JSON
    const filePath = path.join(__dirname, '..', 'orders', `order_${orderId}.json`);

    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ message: 'Order not found', error: err });
        }
        res.status(200).json(JSON.parse(data));
    });
};

module.exports = { saveOrder, getOrder };