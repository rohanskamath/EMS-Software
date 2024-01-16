const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const jwt = require("jsonwebtoken");

//For Hashing of password
const bcrypt = require("bcrypt");

//For handling image upload
const multer = require("multer");
const path = require("path");

// Connection to Express
const app = express();

//app.use(cors()) -->Normal use

// for tokens
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
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

// Adding new category/department
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

//Display all Category/Department
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
          Error: "No Records Found",
        });
      }
    }
  });
});

//image upload
const storageValue = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storageValue,
});

// Adding new employee details
app.post("/employee/add_employee", upload.single("emp_image"), (req, res) => {
  const sql = `INSERT INTO employee (emp_name,emp_email,emp_pass,emp_sal,emp_addr,emp_img,dept_id) VALUES (?)`;
  bcrypt.hash(req.body.emp_pass, 10, (err, hashPass) => {
    if (err) {
      return res.json({
        status: false,
        Error: "Internal Server Error",
      });
    } else {
      const values = [
        req.body.emp_name,
        req.body.emp_email,
        hashPass,
        req.body.emp_sal,
        req.body.emp_addr,
        req.file.filename,
        req.body.emp_dept,
      ];
      db.query(sql, [values], (err, result) => {
        if (err) {
          return res.json({
            status: false,
            Error: "Internal Server Error",
          });
        } else {
          return res.json({
            status: true,
            success: "New Employee added successfully!!",
          });
        }
      });
    }
  });
});

// Display all employees
app.get("/employee", (req, res) => {
  const sql =
    "SELECT e.emp_id,e.emp_name,e.emp_email,e.emp_sal,e.emp_addr,e.emp_img,c.category_name FROM employee e,category c where e.dept_id=c.id";
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
          Error: "No records found",
        });
      }
    }
  });
});

// Get Employee details using id
app.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE emp_id = ?";
  db.query(sql, [id], (err, result) => {
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
          Error: "No records found",
        });
      }
    }
  });
});

// Updating the Employee details
app.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee SET emp_name=?,emp_email=?,emp_sal=?,emp_addr=?,dept_id=? WHERE emp_id=?`;
  const values = [
    req.body.emp_name,
    req.body.emp_email,
    req.body.emp_sal,
    req.body.emp_addr,
    req.body.emp_dept,
  ];
  db.query(sql, [...values, id], (err, result) => {
    if (err) {
      return res.json({
        status: false,
        Error: "Select Department Field",
      });
    } else {
      return res.json({
        status: true,
        success: "Employee updated successfully!!",
      });
    }
  });
});

// Delete Employee details
app.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE emp_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({
        status: false,
        Error: "Internal Server Error",
      });
    } else {
      return res.json({
        status: true,
        success: "Employee details deleted successfully!!",
      });
    }
  });
});

// Count Salary and Employees
app.get("/employee_count", (req, res) => {
  const sql = "SELECT COUNT(emp_id) as employee FROM employee";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        status: false,
        Error: "Internal Server Error",
      });
    } else {
      return res.json({
        status: true,
        data: result,
      });
    }
  });
});

app.get("/salary_count", (req, res) => {
  const sql = "SELECT SUM(emp_sal) as salaries FROM employee";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        status: false,
        Error: "Internal Server Error",
      });
    } else {
      return res.json({
        status: true,
        data: result,
      });
    }
  });
});

// Get all admins if more than 1 admins
app.get("/admins", (req, res) => {
  const sql = "SELECT * FROM admin";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        status: false,
        Error: "Internal Server Error",
      });
    } else {
      return res.json({
        status: true,
        data: result,
      });
    }
  });
});

// Get profile details
app.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM admin WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({
        status: false,
        Error: "Internal Server Error",
      });
    } else {
      return res.json({
        status: true,
        data: result,
      });
    }
  });
});

// Logout
app.get("/auth/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({
    status: true,
  });
});
app.use(express.static("public"));

//Listening to Server
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
