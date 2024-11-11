import mysql from "mysql";

class databaseController {
  constructor(host, user, password, dbName) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.dbName = dbName;
  }

  //* CREATE FUNCTIONS ENDS HERE ---------------------------------------------------------------------------------------
  createConnection() {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
      });

      // Attempt to connect
      con.connect((err) => {
        if (err) {
          console.error("Connection error:", err);
          reject(err);
        } else {
          console.log("Connection successful!");
          resolve(con);
        }
      });
    });
  }

  createConnectionWithDB() {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.dbName,
      });

      // Attempt to connect
      con.connect((err) => {
        if (err) {
          console.error("Connection error:", err);
          reject(err);
        } else {
          console.log("Connection successful With Database!");
          resolve(con);
        }
      });
    });
  }
}

export { databaseController };
