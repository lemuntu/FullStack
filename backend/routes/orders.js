const express = require('express');
const router = express.Router();
const db = require('../db');

// Create an order
router.post('/', (req, res) => {
    const { user_id, product_id, quantity, total_price } = req.body;
    db.query('INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)', 
    [user_id, product_id, quantity, total_price], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Order placed successfully' });
    });
});

// Get all orders
router.get('/', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

module.exports = router;
