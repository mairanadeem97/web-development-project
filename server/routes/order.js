const express = require("express")
const router = express.Router()
const Order = require("../models/order")

router.get('/getOrdersByUser/:userId', async (req, res) => {
    try {
const userId = req.params.userId;
        const orders = await Order.getOrdersByUser(userId);

        res.send(orders)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router