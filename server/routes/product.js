const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// This matches: GET http://localhost:3500/products/getAllProducts
router.get('/getAllProducts', async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.send(products);
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});

// This matches: GET http://localhost:3500/products/5 (or 6, 7, 8)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.getProductById(req.params.id);
        if (!product) return res.status(404).send({message: "Product not found"});
        res.send(product);
    } catch(err) {
        res.status(500).send({message: err.message});
    }
})

router.post('/addToCart', (req, res) => {
    const { productId, userId, quantity } = req.body;
    
    console.log("Adding to cart:", productId, userId, quantity);

    // Your database logic here...
    // Example: db.query('INSERT INTO Cart ...')

    res.status(200).json({ message: "Product added to cart!" });
})
module.exports = router