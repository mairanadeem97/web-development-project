const express = require("express")
const router = express.Router()
const product = require("../models/product")

router.get('/getAllProducts', async (req, res) => {
    try {
        const products = await product.getAllProducts()
        res.send(products)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router