const fs=require("fs");
const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const data=fs.readFileSync("./database.json");
const conf=JSON.parse(data);
const mysql=require("mysql");

const connection=mysql.createConnection({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database
}); 
connection.connect();

app.get('/api/user', (req,res)=>{
    connection.query(
        "SELECT * FROM USER",
        (err, rows, fields)=>{
            res.send(rows);
        });
})

app.post('/api/user', (req,res)=>{
    let sql='INSERT INTO USER VALUES (?,?,?,?,?,?)';
    let id=req.body.id;
    let pass=req.body.pass;
    let name=req.body.name;
    let birth=req.body.birth;
    let gender=req.body.gender;
    let phone=req.body.phone;
    let params=[id, pass, name, birth, gender, phone];
    connection.query(sql, params, (err, rows, fields)=>{
        res.send(err);
    })
})

app.listen(port, ()=>console.log(`Listening on port ${port}`))