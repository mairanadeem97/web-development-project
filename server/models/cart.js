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
async function getAllCartsItem() {
    let sql = `
      SELECT * FROM CART;
    `
    await con.query(sql)
}

module.exports = {getAllCartsItem} // Add functions as needed later