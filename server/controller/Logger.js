const DBConnector = require('../models/DBConnector');

class Logger {
  constructor() {
    this.db = new DBConnector();
  }

  async checkInCar(log_car_number, isMembers) {
    let rns = 0;
    let result;
    let query;
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const timeZoneDate = new Date(Date.now() - timeZoneOffset);
    let intime;
    intime = timeZoneDate.toISOString().slice(0, 19).replace('T', ' ');

    if (log_car_number != '' && log_car_number.length >= 7) {
      console.log(log_car_number.length);
      query = `INSERT INTO logs(log_car_number, in_time) VALUES ('${log_car_number}', '${intime}')`;
      result = await this.db.getData(query);
      if (result['affectedRows'] > 0) {
        rns = 1;
      } else {
        console.log(result);
      }
    } else {
      console.log('차량 번호를 다시 입력해주세요.');
    }
    console.log(rns);
    return rns;
  }

  async checkOutCar(log_car_number) {
    let rns = 0;
    let query_result;
    let query;
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const timeZoneDate = new Date(Date.now() - timeZoneOffset);
    let outtime;
    outtime = timeZoneDate.toISOString().slice(0, 19).replace('T', ' ');

    query = `UPDATE logs SET out_time = '${outtime}' WHERE log_car_number = '${log_car_number}' ORDER BY in_time DESC LIMIT 1`;
    query_result = await this.db.getData(query);
    if (query_result['affectedRows'] > 0) {
      console.log('출차 처리 완료되었습니다. 안녕히 가세요. :)');
      rns = 1;
    } else {
      console.log('차량 번호를 다시 입력해주세요.');
      // console.log(query_result);
    }
    return rns;
  }
}

module.exports = Logger;
