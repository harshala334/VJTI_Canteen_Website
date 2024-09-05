const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files like your HTML

// Endpoint to save order data
app.post('/api/save-order', (req, res) => {
    const orderData = req.body;
    const filePath = path.join(__dirname, 'orders.json');

    // Read existing data
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            // File does not exist, create it
            fs.writeFile(filePath, JSON.stringify([orderData], null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error saving order' });
                }
                res.json({ message: 'Order saved successfully' });
            });
        } else if (err) {
            return res.status(500).json({ message: 'Error reading orders file' });
        } else {
            // File exists, append new data
            const orders = JSON.parse(data);
            orders.push(orderData);
            fs.writeFile(filePath, JSON.stringify(orders, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error saving order' });
                }
                res.json({ message: 'Order saved successfully' });
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});