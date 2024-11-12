import mysql from "mysql";

class UsersModel {
  //* Checks whether an email already exists or not
  static checkEmail(con, email) {
    return new Promise((resolve, reject) => {
      con.query(
        `Select * FROM users WHERE email = "${email}"`,
        (err, result) => {
          if (err) {
            return reject(err);
          }

          if (result.length != 0) {
            return resolve({
              status: true,
              message: `Email Already Exists in system`,
              data: result[0]
            });
          } else {
            return resolve({
              status: false,
              message: `Email does not Exists in system`,
            });
          }
        }
      );
    });
  }

  static registerNewUser(con, data) {
    return new Promise((resolve, reject) => {
      con.query(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [data.name, data.email, data.password], (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve({
          status: true,
          message: `New User Registered Successfully`,
        });
      });
    });
  }
}

export default UsersModel;
