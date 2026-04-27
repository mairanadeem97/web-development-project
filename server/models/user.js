const con = require("./db_connect")

async function createUserTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS User (
        userId INT AUTO_INCREMENT,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        CONSTRAINT userPK PRIMARY KEY(userId)
      ); `

    await con.query(sql)
}

createUserTable()

async function getAllUsers() {
    let sql = `
      SELECT * FROM User;
    `
  return  await con.query(sql)
}

module.exports = { getAllUsers }
