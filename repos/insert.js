const mysql = require("mysql2");

const connprops = {
  host: "mybooksdb.cyjbig7c6wwv.us-east-1.rds.amazonaws.com",
  user: "user",
  password: "UserRuiDb2024",
  database: "MyBooks",
  port: 3306,
};

let insert = {
  addNewRow: function (newData, resolve, reject) {
    const query = "INSERT INTO MyBooks.Expenses (Category, Description, ExpenseDate, Cost, IncludesHST, TotalCost, Notes) Values ('" + 
    newData.Category + "','" + newData.Description + "', '" + 
    newData.ExpenseDate + "', " + newData.Cost + ", " + 
    newData.IncludesHST + ", " + newData.TotalCost + ", '"+ newData.Notes + "')";

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

module.exports = insert;
