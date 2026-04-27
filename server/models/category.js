const con = require("./db_connect");

async function createCategoryTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS CATEGORY (
        CategoryId INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL
      );`

    await con.query(sql);
}

createCategoryTable();

async function getAllCategories() {
    let sql = `SELECT * FROM CATEGORY;`;
    return await con.query(sql);
}

module.exports = { getAllCategories }