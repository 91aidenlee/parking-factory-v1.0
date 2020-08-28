const mysql = require('mysql2');

class DBConnector {
  constructor() {
    this.db = mysql.createConnection({
      user: 'root',
      host: 'localhost',
      password: '1355',
      database: 'parking_db',
    });
  }
  connect() {
    this.db.connect();
    console.log('Successfully connected!');
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
