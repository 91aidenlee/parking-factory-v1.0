const DBConnector = require('../models/DBConnector');

class Logger {
  constructor() {
    this.db = new DBConnector();
  }
  // 입차 기록
  async checkInCar(log_car_number) {
    let rns = 0;
    let result;
    let query;
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const timeZoneDate = new Date(Date.now() - timeZoneOffset);
    let intime;
    intime = timeZoneDate.toISOString().slice(0, 19).replace('T', ' ');

    if (log_car_number != '' && log_car_number.length >= 7) {
      console.log('a: ' + log_car_number.length);
      query = `INSERT INTO logs(log_car_number, in_time) VALUES ('${log_car_number}', '${intime}')`;
      // query = `INSERT INTO logs(log_car_number, in_time) SELECT '${log_car_number}', '${intime}' FROM DUAL WHERE NOT EXISTS (SELECT * FROM logs WHERE log_car_number = '${log_car_number}')`;
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
  // 출차 기록
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
    }
    return rns;
  }

  async deleteLog(log_car_number) {
    let rns = 0;
    let query_result;
    let query;

    query = `DELETE FROM logs WHERE log_car_number = '${log_car_number}' AND in_time is NOT NULL AND out_time is NOT NULL ORDER BY out_time DESC LIMIT 1`;
    query_result = await this.db.getData(query);
    if (query_result['affectedRows'] > 0) {
      console.log('입출차 기록에서 삭제되었습니다. :)');
      rns = 1;
    } else {
      console.log('차량 번호를 다시 입력해주세요.');
    }
    return rns;
  }

  async deleteAll() {
    let rns = 0;
    let query_result;
    let query;

    query = `TRUNCATE TABLE logs`;
    query_result = await this.db.getData(query);
    if (query_result['affectedRows'] > 0) {
      rns = 1;
    }
    return rns;
  }
  // 출차 처리가 되지 않은 차량의 재입차를 차단하는 함수 구현중...
  async duplicateCarNumber(log_car_number) {
    let rns = 0;
    let result;
    let query;
    query = `SELECT * FROM logs WHERE log_car_number = '${log_car_number}' AND in_time is NOT NULL AND out_time is NULL`;
    result = await this.db.getData(query);
    console.log(result);
    if (!result[0]) {
      rns = 1;
    }
    return rns;
  }
}

module.exports = Logger;
