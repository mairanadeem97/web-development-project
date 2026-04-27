const con = require("./db_connect")
require("./category");
async function createProductTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS PRODUCT (
    ProductId INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    ProductDescription TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL,
    Img VARCHAR(255),
    CategoryId INT,
    CONSTRAINT categoryFK FOREIGN KEY (CategoryId) REFERENCES CATEGORY(CategoryId) 
);`


    await con.query(sql)
}

createProductTable()

async function getAllProducts() {
    let sql = `
      SELECT * FROM Product;
    `
    await con.query(sql)
}

module.exports = { getAllProducts }

