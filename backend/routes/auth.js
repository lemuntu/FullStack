const express = require('express');
const router = express.Router();
const db = require('../db');

// Register a user
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], 
    (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'User registered successfully' });
    });
});

// Get all users
router.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

module.exports = router;
