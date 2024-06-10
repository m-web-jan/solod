const express = require("express");
const mysql = require("mysql2"); 
const cors = require("cors");
const multer = require ("multer");
const bodyParser = require ("body-parser");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/menu", (req, res) => {
  const categoryId = req.query.categoryId;
  const sql = `SELECT * FROM menu where category = "${categoryId}"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result); // Отправляем данные клиенту в формате JSON
  });
});



let dbAdmin;
app.get("/admin", (req, res) => {
  const login = req.query.login;
  const password = req.query.password;
  dbAdmin = mysql.createConnection({
    host: "MySQL-8.2",
    user: login,
    database: "solod",
    password: password,
  });

  dbAdmin.connect((err) => {
    if (err) {
      return res.status(401).json({ error: "Неправильный логин или пароль" });
    }
    console.log("Connected to database");
  });

  const sql = `SELECT * FROM menu`;
  dbAdmin.query(sql, (err, result) => {
    if (err) {
      return res.status(401).json({ error: "Ошибка выполнения запроса" });
    }
    res.json(result);
  });
});

app.get("/admin/delete", (req, res) => {
  const id = req.query.id;
  const sql = `DELETE FROM menu WHERE id = '${id}'`;

  dbAdmin.query(sql, (err, result) => {
    if (err) {
      return res.status(401).json({ error: "Ошибка выполнения запроса" });
    }
    res.json(result);
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "cardsImg/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.post("/addItem", (req, res) => {
  const { name, description, fileName, category, weight, price} = req.body;
  const sql = `INSERT INTO menu ( 'name', 'description', 'weight', 'price', 'category', 'img_url') VALUES ('${name}','${description}','${fileName}','${category}','${weight}','${price}')`;

  dbAdmin.query(sql, (err, result) => {
    if (err) {
      return res.status(401).json({ error: "Ошибка выполнения запроса" });
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
