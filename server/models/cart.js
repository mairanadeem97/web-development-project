const con = require("./db_connect");
require("./user");
require("./product"); 

async function createCartTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS CART (
        CartId INT AUTO_INCREMENT PRIMARY KEY,
        UserId INT,
        ProductId INT,
        Quantity INT NOT NULL DEFAULT 1,
        CONSTRAINT cartUserFK FOREIGN KEY (UserId) REFERENCES USER(UserId),
        CONSTRAINT cartProductFK FOREIGN KEY (ProductId) REFERENCES PRODUCT(ProductId)
      );`;
    await con.query(sql);
}

createCartTable();
async function addToCart(userId, productId) {
    // Check if the item is already in the cart for this user
    let checkSql = `SELECT * FROM CART WHERE UserId = ? AND ProductId = ?`;
    const [existing] = await con.query(checkSql, [userId, productId]);

    if (existing.length > 0) {
        // If it exists, just increment the quantity
        let updateSql = `UPDATE CART SET Quantity = Quantity + 1 WHERE UserId = ? AND ProductId = ?`;
        return await con.query(updateSql, [userId, productId]);
    } else {
        // If it's new, insert it
        let insertSql = `INSERT INTO CART (UserId, ProductId, Quantity) VALUES (?, ?, 1)`;
        return await con.query(insertSql, [userId, productId]);
    }
}

async function getCartWithDetails(userId) {
    // This JOIN is what helps the "Checkout thing" show names and prices instead of just IDs
    let sql = `
      SELECT CART.CartId, PRODUCT.ProductName, PRODUCT.Price, CART.Quantity 
      FROM CART 
      JOIN PRODUCT ON CART.ProductId = PRODUCT.ProductId 
      WHERE CART.UserId = ?;
    `;
    const [rows] = await con.query(sql, [userId]);
    return rows;
}

module.exports = {addToCart, getCartWithDetails,} // Add functions as needed later