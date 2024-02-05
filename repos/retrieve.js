const mysql = require("mysql2");

const connprops = {
  host: "mybooksdb.cyjbig7c6wwv.us-east-1.rds.amazonaws.com",
  user: "user",
  password: "UserRuiDb2024",
  database: "MyBooks",
  port: 3306,
};

let retrieve = {
  get: function (resolve, reject) {
    const query = "Select id as 'No.', Category as 'Category', Description as 'Details', ExpenseDate as 'Date', Cost as ' Cost',  IncludesHST as 'HST', TotalCost as 'Total Cost', Notes as 'Notes' FROM MyBooks.Expenses ORDER BY ExpenseDate DESC";
    
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
  getById: function (id, resolve, reject) {
    const query = "Select id as 'No.', Category as 'Category', Description as 'Details', ExpenseDate as 'Date', Cost as ' Cost',  IncludesHST as 'HST', TotalCost as 'Total Cost', Notes as 'Notes' FROM MyBooks.Expenses WHERE ID = " + id;
    
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
  search: function (searchObject, resolve, reject) {
    const query =
      "Select id as 'No.', Category as 'Category', Description as 'Details', ExpenseDate as 'Date', Cost as ' Cost',  IncludesHST as 'HST', TotalCost as 'Total Cost', Notes as 'Notes' FROM MyBooks.Expenses WHERE Description like '%" +
      searchObject.name +
      "%'";
    
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

module.exports = retrieve;
