const mysql = require('mysql2');

require('dotenv').config();

// 建立一個mysql pool 連接池
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// 依據email 查是否有該用戶
async function getUser(email) {
  const [rows] = await pool.query(
    `
    SELECT * FROM user
    WHERE email = ?
    `,
    [email]
  );
  return rows[0];
}

// 註冊
async function createUser(email, password) {
  const [result] = await pool.query(
    `
    INSERT INTO user (email, password)
    VALUES (?, ?)
    `,
    [email, password]
  );
  return getUser(email);
}

// // 確認email是否匹配
async function checkLogin(email, password) {
  const [rows] = await pool.query(
    `
    SELECT * FROM user
    WHERE email = ? AND password = ?
    `,
    [email, password]
  );
  return rows[0];
}

// 比較和Prepared Statement 的差別
async function checkLoginNormal(email, password) {
  const [rows] = await pool.query(
    `
    SELECT * FROM user
    WHERE email = '${email}' AND password = '${password}'
    `
  );
  return rows[0];
}

// 測試function
async function testdb() {
  const testEmail = 'test1@gmail.com';
  const testPasswordCorrect = ` ' OR "1"="1" ' `; // '$2b$10$BiqmxeTHg3To2FYz9M0IeOPJVvASlNW3z4DnWqTX1b.eUitAEEFrO';
  const resultNormal = await checkLoginNormal(testEmail, testPasswordCorrect);
  const result = await checkLogin(testEmail, testPasswordCorrect);
  console.log(resultNormal); // 會有使用者資訊
  console.log(result); // undefined
}

if (require.main === module) {
  testdb();
}

// exports
module.exports = {
  getUser,
  createUser,
};
