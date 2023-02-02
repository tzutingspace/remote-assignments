const mysql = require('mysql2');

require('dotenv').config();

// 建立一個mysql pool 連接池
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MQSQL_DATABASE,
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
// async function checkLogin(email, password) {
//   const [rows] = await pool.query(
//     `
//     SELECT * FROM user
//     WHERE email = ? AND password = ?
//     `,
//     [email, password]
//   );
//   return rows[0];
// }

// exports
module.exports = {
  getUser,
  createUser,
};
