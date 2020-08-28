const DBConnector = require('../models/DBConnector');

class Members {
  constructor() {
    this.db = new DBConnector();
  }
  // 한달 정기권 구매
  async joinMember(name, phone_number, my_car_number) {
    let rns = 0;
    let result;
    let query;

    // 월 정기권 유효기간을 변수에 저장하고 테이블에 넘기는 부분 구현중...
    // const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    // const timeZoneDate = new Date(Date.now() - timeZoneOffset);
    // let allow_date;
    // allow_date = timeZoneDate.toISOString().slice(0, 10).replace('T', ' ');

    console.log(name, phone_number, my_car_number);
    query = `INSERT INTO members (name, phone_number, member_car_number) VALUES('${name}', '${phone_number}', '${my_car_number}')`;
    result = await this.db.getData(query);
    if (result['affectedRows'] > 0) {
      rns = 1;
    } else {
      console.log(result);
    }
    console.log(rns);
    return rns;
  }
  //정기권 소지 여부 확인
  async checkRegular(my_car_number) {
    const db = this.db;
    let query;
    let result;
    let rns = 0;

    query = `SELECT * FROM members WHERE member_car_number = '${my_car_number}'`;
    result = await db.getData(query);
    console.log(result[0]);
    if (result[0]) {
      rns = 1;
    }
    return rns;
  }

  // 회원 이름 가져오는 함수 구현중...
  // async checkMemberName(my_car_number) {
  //   const db = this.db;
  //   let query;
  //   let result;
  //   let rns = 0;

  //   query = `SELECT * FROM members WHERE member_car_number = '${my_car_number}'`;
  //   result = await db.getData(query);
  //   if (result[0]) {
  //     rns = 1;
  //   }
  //   return rns;
  // }
}

module.exports = Members;
