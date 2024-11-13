import mysql from "mysql";

class DatabaseModelClass {
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
        database: this.dbName,
      });

      // Attempt to connect
      con.connect((err) => {
        if (err) {
          console.error("Connection error:", err);
          return reject(err);
        } else {
          console.log("Connection With Database!");
          return resolve(con);
        }
      });
    });
  }

  createTable(con, tableName, attributes) {
    return new Promise((resolve, reject) => {
      con.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${attributes})`, (err, result) => {
        if (err) {
          console.error(`Error creating table ${tableName}: err`);
          return reject(err);
        }

        return resolve({
          status: true,
          message: `Table named '${tableName}' created successfully!`,
          data: result,
        });
      });
    });
  }
}

export default DatabaseModelClass;
