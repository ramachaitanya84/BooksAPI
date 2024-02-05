const mysql = require("mysql2");

const connprops = {
  host: "mybooksdb.cyjbig7c6wwv.us-east-1.rds.amazonaws.com",
  user: "user",
  password: "UserRuiDb2024",
  database: "MyBooks",
  port: 3306,
};

let update = {
  updateRow: function (newData, id, resolve, reject) {
    const query = "UPDATE MyBooks.Expenses SET " +
    "Category = '" + newData.Category + "', Description = '" + newData.Description + "', " + 
    "ExpenseDate = '" + newData.ExpenseDate + "', Cost = " + newData.Cost + ", " + 
    "IncludesHST = " + newData.IncludesHST + ", TotalCost = " + newData.TotalCost + 
    ", Notes = '"+ newData.Notes + "' WHERE ID = " + id;

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

module.exports = update;
