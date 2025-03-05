const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Add a new product
router.post('/', (req, res) => {
    const { name, price, description, image } = req.body;
    db.query('INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)', 
    [name, price, description, image], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Product added successfully' });
    });
});

module.exports = router;
