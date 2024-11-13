class accessTokenModel {
  static addNewToken(con, data) {
    return new Promise((resolve, reject) => {
      con.query(
        `INSERT INTO accessToken (accessToken, expireDate, expireDateInString) VALUES (?, ?, ?)`,
        [data.accessToken, data.expireDate, data.expireDateInString],
        (err, result) => {
          if (err) {
            return reject(err);
          }

          return resolve({
            status: true,
            message: `New Access token Recorded Successfully`,
            data: {userId:result.insertId, token:data.accessToken},
          });
        }
      );
    });
  }

  static checkToken(con, token) {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM accessToken WHERE accessToken = "${token}"`,
        (err, result) => {
          if (err) {
            return reject(err);
          }

          if (result.length != 0) {
            return resolve({
              status: true,
              message: `Token exists in the system`,
              data: result[0]
            });
          } else {
            return resolve({
              status: false,
              message: `Invalid Token! Does not exists in our system. Please login again`,
            });
          }
        }
      );
    });
  }
}

export default accessTokenModel;