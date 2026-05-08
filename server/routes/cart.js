const express = require('express');
const router = express.Router();
const cartModel = require('../models/cart');

// POST route to add item
router.post('/add', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        await cartModel.addToCart(userId, productId);
        res.status(200).json({ message: "Product added to cart!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET route for the Checkout page
router.get('/:userId', async (req, res) => {
    try {
        const items = await cartModel.getCartWithDetails(req.params.userId);
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router