const fs=require("fs");
const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const port=process.env.PORT || 5000;
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
require("dotenv").config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
    origin: true,  
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],}));

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

app.post('/api/user', async(req,res)=>{
    let sql='INSERT INTO USER VALUES (?,?,?,?,?,?)';
    const hashAuth = await bcrypt.hash(req.body.pass, 10);
    let id=req.body.id;
    let name=req.body.name;
    let birth=req.body.birth;
    let gender=req.body.gender;
    let phone=req.body.phone;
    let params=[id, hashAuth, name, birth, gender, phone];
    connection.query(sql, params, (err, rows, fields)=>{
        res.send(err);
    })
})

app.post('/api/login',async(req,res)=>{
    let sql='SELECT pass, name, id FROM USER WHERE id=?';
    const receivedPw = await bcrypt.hash(req.body.pw, 10);

    connection.query(sql, req.body.id, async(err,rows,fields)=>{
        let pass, id;
        for(var i in rows){
            pass=rows[i].pass;
            id=rows[i].id;
        }
        let token = jwt.sign({
            id:id
          },
          process.env.JWT_SECRET ,
          {
            expiresIn: '30m'
          })
        if(id){
            let check=await bcrypt.compare(req.body.pw, pass);
            if(check){
                res.cookie("albaToken",token,{maxAge:1000*60*30, httpOnly:true});
                res.json({token:token});
            }
            else
                res.send(false);
            }
        else
            res.send(false);
    })
})
app.post('/api/userConfirm', async(req,res)=>{
    let sql='SELECT name FROM USER WHERE id=?';
    let decoded, name;
    if(req.cookies.albaToken)
        decoded=jwt.verify(req.cookies.albaToken, process.env.JWT_SECRET);
    if(decoded){
        connection.query(sql, decoded.id, (err, rows, fields)=>{
            for(let i in rows){
                name=rows[i].name;
            }
            res.send(name);
        }) 
    }
}) 
app.get('/api/logout', (req,res)=>{
    res.clearCookie('albaToken');
    res.send("cookie deleted");
})



//게시글 관련
app.get('/api/post/:category', (req,res)=>{
    const params=req.params;
    let sql=`SELECT * FROM ${req.params.category}`;
    connection.query(sql, (err,rows, fileds)=>{
        res.send(rows);
    })
})

app.listen(port, ()=>console.log(`Listening on port ${port}`))