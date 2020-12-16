const env = require("dotenv");
const mysql = require("mysql2");

env.config();

//DB 연결
class DBConnector {
  constructor() {
    this.db = mysql.createPool({
      connectionLimit: 7,
      user: process.env.MYSQL_USER,
      host: process.env.MYSQL_HOST,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });
  }
  connect() {
    this.db.connect();
    console.log("Successfully connected!");
  }
  disconnect() {
    this.db.end();
  }
  putData(query) {
    return new Promise((resolve, reject) => {
      this.db.query(query, (err, result) => {
        return err ? resolve(err) : resolve(result);
      });
    });
  }

  getData(query) {
    return new Promise((resolve, reject) => {
      this.db.query(query, (err, result) => {
        return err ? resolve(err) : resolve(result);
      });
    });
  }
}

module.exports = DBConnector;
