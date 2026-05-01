const express = require("express")
const router = express.Router()
const Category = require("../models/cart")

router.get('/getAllCartsItem', async (req, res) => {
    try {
        const cartItems = await Cart.getAllCartsItem()
        res.send(cartItems)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router