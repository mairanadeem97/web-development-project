const con = require("./db_connect");

async function createProductTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS PRODUCT (
        ProductId INT AUTO_INCREMENT PRIMARY KEY,
        ProductName VARCHAR(255) NOT NULL,
        ProductDescription TEXT,
        Price DECIMAL(10, 2) NOT NULL,
        StockQuantity INT NOT NULL,
        Img VARCHAR(255)
      );`;

    await con.query(sql);
}

createProductTable();

// Function to populate the data you provided
async function seedDatabase() {
    // Check if data already exists to avoid duplicates
    const existing = await getAllProducts();
    if (existing.length > 0) return;

    const products = [
        ['Multivitamin for Men', 'Supports energy and immunity.', 19.99, 100, 'multimen.jpg'],
        ['Eye Health Supplement', 'Advanced formula for vision.', 24.95, 50, 'eyehealth.jpg'],
        ['Vitamin D3 Supplements', 'High potency for bone health.', 12.00, 200, 'vd3.jpg'],
        ['L carnitine', 'Metabolism support.', 29.99, 75, 'carnitine.jpg']
    ];

    let sql = `INSERT INTO PRODUCT (ProductName, ProductDescription, Price, StockQuantity, Img) VALUES ?`;
    
    try {
        await con.query(sql, [products]);
        console.log("Supplements inserted successfully.");
    } catch (err) {
        console.error("Error seeding data:", err);
    }
}

// Call seed function
seedDatabase();

// --- CRUD Operations ---

async function createProduct(product) {
    let sql = `
      INSERT INTO PRODUCT (ProductName, ProductDescription, Price, StockQuantity, Img)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    return await con.query(sql, [
        product.ProductName, 
        product.ProductDescription, 
        product.Price, 
        product.StockQuantity, 
        product.Img
    ]);
}

async function getAllProducts() {
    let sql = `SELECT * FROM PRODUCT`;
    return await con.query(sql);
}

async function getProductById(id) {
    let sql = `SELECT * FROM PRODUCT WHERE ProductId = ?`;
    let result = await con.query(sql, [id]);
    return result[0];
}

async function updateProduct(product) {
    let sql = `
      UPDATE PRODUCT 
      SET ProductName = ?, ProductDescription = ?, Price = ?, StockQuantity = ?, Img = ?
      WHERE ProductId = ?
    `;
    
    return await con.query(sql, [
        product.ProductName, 
        product.ProductDescription, 
        product.Price, 
        product.StockQuantity, 
        product.Img,
        product.ProductId
    ]);
}

async function deleteProduct(id) {
    let sql = `DELETE FROM PRODUCT WHERE ProductId = ?`;
    return await con.query(sql, [id]);
}

module.exports = { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
}