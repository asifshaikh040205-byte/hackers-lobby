const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "dashboard.html"));
});

// CREATE
app.post("/login",(req,res)=>{
     console.log(req.body);

    const { user, password } = req.body;


    const query =
        "select username,password from login where username=? and password=?";

    db.query(query, [user, password], (err, result) => {
        //if (err) throw err;

        
        console.log("res",result);

        if(result.length >0)
        {
             res.json({
                result: "true",
                msg: "Login successfully"
           });
        }
        else{
              res.json({
                result: "false",
                msg: "invalid"
           });
        }
        // if (result.affectedRows > 0) {
        //     res.json({
        //         result: "true",
        //         msg: "Login successfully"
        //     });
        // } else {
        //     console.log(result);
        //     res.json({
        //         result: "false",
        //         msg: "Error"
        //     });
        // }
    });

});
app.post("/add", (req, res) => {
    console.log(req.body);

    const {name, password } = req.body;


    const query =
        "INSERT INTO login (username,password) VALUES (?, ?)";

    db.query(query, [name, password], (err, result) => {
        if (err) throw err;

        console.log(result);

        if (result.affectedRows > 0) {
            res.json({
                result: "true",
                msg: "Record Inserted"
            });
        } else {
            res.json({
                result: "false",
                msg: "Errorwtwtwt"
            });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});