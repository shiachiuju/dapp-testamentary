const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql')
// const PORT = 3002;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project_db"
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(express.json())

app.post("/api/insert", (req,res)=>{

    const account_address = req.body.account_address;
    const maincontract_address = req.body.maincontract_address;
    const sqlInsert = "INSERT INTO maincontract (account_address, maincontract_address) VALUES (?,?)"
    db.query(sqlInsert, [account_address, maincontract_address],(err,result)=>{
        console.log(result)
    });   
});






// // Route to get all posts
// app.get("/api/get", (req,res)=>{
// db.query("SELECT * FROM posts", (err,result)=>{
//     if(err) {
//     console.log(err)
//     } 
// res.send(result)
// });   });

// // Route to get one post
// app.get("/api/getFromId/:id", (req,res)=>{

// const id = req.params.id;
//  db.query("SELECT * FROM posts WHERE id = ?", id, 
//  (err,result)=>{
//     if(err) {
//     console.log(err)
//     } 
//     res.send(result)
//     });   });

// // Route for creating the post
// app.post('/api/create', (req,res)=> {

// const username = req.body.userName;
// const title = req.body.title;
// const text = req.body.text;

// db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",[title,text,username], (err,result)=>{
//    if(err) {
//    console.log(err)
//    } 
//    console.log(result)
// });   })

// // Route to like a post
// app.post('/api/like/:id',(req,res)=>{

// const id = req.params.id;
// db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
//     if(err) {
//    console.log(err)   } 
//    console.log(result)
//     });    
// });

// // Route to delete a post

// app.delete('/api/delete/:id',(req,res)=>{
// const id = req.params.id;

// db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
// if(err) {
// console.log(err)
//         } }) })

app.listen(3002, ()=>{
    // console.log(`Server is running on ${PORT}`)
    console.log('Server is running on 3002')
})