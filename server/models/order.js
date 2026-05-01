const con = require("./db_connect");
require("./user"); // Ensures USER table exists first

async function createOrderTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS ORDERS (
        OrderId INT AUTO_INCREMENT PRIMARY KEY,
        OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        TotalAmount DECIMAL(10, 2) NOT NULL,
        OrderStatus VARCHAR(50) DEFAULT 'Pending',
        UserId INT,
        CONSTRAINT userOrderFK FOREIGN KEY (UserId) REFERENCES USER(UserId)
      );`
    await con.query(sql);
}

createOrderTable();

async function getOrdersByUser(userId) {
    let sql = `SELECT * FROM ORDERS WHERE UserId = ?;`;
    const [rows] = await con.query(sql, [userId]);
    return rows;
}

module.exports = { getOrdersByUser }