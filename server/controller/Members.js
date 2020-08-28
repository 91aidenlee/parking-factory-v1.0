const DBConnector = require('../models/DBConnector');

class Members {
  constructor() {
    this.db = new DBConnector();
  }
  async joinMember(name, phone_number, my_car_number) {
    let rns = 0;
    let result;
    let query;
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const timeZoneDate = new Date(Date.now() - timeZoneOffset);

    let allow_date;

    allow_date = timeZoneDate.toISOString().slice(0, 10).replace('T', ' ');
    console.log(name, phone_number, my_car_number, allow_date);
    query = `INSERT INTO members (name, phone_number, member_car_number, expiration_date) VALUES('${name}', '${phone_number}', '${my_car_number}', '${allow_date}')`;
    result = await this.db.getData(query);
    if (result['affectedRows'] > 0) {
      rns = 1;
    } else {
      console.log(result);
    }
    console.log(rns);
    return rns;
  }
  async checkRegular(my_car_number) {
    const db = this.db;
    let query;
    let result;
    let rns = 0;

    query = `SELECT * FROM members WHERE member_car_number = '${my_car_number}'`;
    result = await db.getData(query);
    if (result[0]) {
      rns = 1;
    }
    return rns;
  }
}

module.exports = Members;
