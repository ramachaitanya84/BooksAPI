const mysql = require("mysql2");

const connprops = {
  host: "mybooksdb.cyjbig7c6wwv.us-east-1.rds.amazonaws.com",
  user: "user",
  password: "UserRuiDb2024",
  database: "MyBooks",
  port: 3306,
};

let remove = {
  deleteRow: function (id, resolve, reject) {
    const query = "DELETE FROM MyBooks.Expenses WHERE ID = " + id;
    
    const db = mysql.createConnection(connprops);

    db.connect();
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        reject(err);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });

    db.end();
  },
};

module.exports = remove;
