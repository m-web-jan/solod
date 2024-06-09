// const mysql = require("mysql2");
// const { displayData } = require("./menu");

// const connection = mysql.createConnection({
//   host: "MySQL-8.2",
//   user: "root",
//   database: "solod",
//   password: "",
// });

// // тестирование подключения
// connection.connect(function (err) {
//   if (err) {
//     console.log(err);
//     return err;
//   } else {
//     console.log("Подключение к серверу MySQL успешно установлено");
//   }
// });

// let query = "SELECT * FROM menu where category = 'Горячее'";
// connection.query(query, (err, result, feld) => {
//   console.log(err);
//   // console.log(result);
//   displayData(result);
//   // console.log(feld);
// });

// connection.end();

const express = require("express");
const mysql = require("mysql2"); // Или любой другой модуль для работы с вашей БД
const cors = require('cors'); // Подключаем cors
const app = express();
const port = 3000;
app.use(cors());

// Настройка подключения к базе данных
const db = mysql.createConnection({
  host: "MySQL-8.2",
  user: "root",
  database: "solod",
  password: "",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

app.get("/data", (req, res) => {
  const sql = "SELECT * FROM menu";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result); // Отправляем данные клиенту в формате JSON
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
