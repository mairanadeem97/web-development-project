const express = require('express');
const router = express.Router();
const db = require('../models/db_connect'); // Your DB connection file

router.post('/create', async (req, res) => {
    const { userId, items } = req.body;

    try {
        // 1. Create a main Order record
        const [orderResult] = await db.query(
            'INSERT INTO ORDERS (UserId, OrderDate) VALUES (?, NOW())', 
            [userId]
        );
        const orderId = orderResult.insertId;

        // 2. Loop through cart items and insert into ORDER_ITEMS table
        for (let item of items) {
            await db.query(
                'INSERT INTO ORDER_ITEMS (OrderId, ProductId, Quantity, Price) VALUES (?, ?, ?, ?)',
                [orderId, item.id, item.qty, item.price]
            );
        }

        res.status(201).json({ message: "Order saved to backend!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save order" });
    }
});

module.exports = router