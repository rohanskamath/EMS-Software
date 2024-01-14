const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const jwt = require("jsonwebtoken");

// Connection to Express
const app = express();
app.use(express.static(path.join(__dirname, "public")));

//app.use(cors()) -->Normal use

// for tokens
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

const port = 3000;

// Connection establishing to Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ems",
});

db.connect((err) => {
  if (err) {
    console.log("Connection Failed!!");
  } else {
    console.log("Connected to Database!!");
  }
});

// Admin Login Functionality using jwt token for storing cookies
app.post("/auth/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email=? and password=?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({
        loginStatus: false,
        errorLogin: "Internal Server Error",
      });
    }
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token);
      return res.json({
        loginStatus: true,
        successLogin: "Logged in Successfully!",
      });
    } else {
      return res.json({
        loginStatus: false,
        errorLogin: "Invalid email-id / password",
      });
    }
  });
});

// Adding new category
app.post("/category/add_category", (req, res) => {
  const sql = "INSERT INTO category (`category_name`) VALUES (?)";
  db.query(sql, [req.body.category_name], (err, result) => {
    if (err) {
      return res.json({
        status: false,
        Error: "Internal Server Error",
      });
    } else {
      return res.json({
        status: true,
        success: "New Category added successfully!!",
      });
    }
  });
});

//Display all Category
app.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        status: false,
        Error: "Internal Server Error",
      });
    } else {
      if (result.length > 0) {
        return res.json({
          status: true,
          data: result,
        });
      } else {
        return res.json({
          status: false,
          Error: "No Records Found"
        })
      }
    }
  });
});

//Listening to Server
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
