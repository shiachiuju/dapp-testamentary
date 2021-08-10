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
    const sqlInsert_1 = "INSERT INTO maincontract (account_address, maincontract_address) VALUES (?,?)"
    db.query(sqlInsert_1, [account_address, maincontract_address],(err,result)=>{
        console.log(result)
    });   
});

app.post("/api/insertbackup", (req,res)=>{
    const account_address = req.body.account_address;
    const maincontract_address = req.body.maincontract_address;
    const backupcontract_address = req.body.backupcontract_address;
    const sqlInsert = "INSERT INTO backupcontract (account_address, maincontract_address, backupcontract_address) VALUES (?,?,?)"
    db.query(sqlInsert, [account_address, maincontract_address, backupcontract_address],(err,result)=>{
        console.log(result)
    });   
});

app.post("/api/insertsettestament", (req,res)=>{
    const account_address = req.body.account_address;
    const maincontract_address = req.body.maincontract_address;
    const settestamentcontract_address = req.body.settestamentcontract_address;
    const sqlInsert = "INSERT INTO settestamentcontract (account_address, maincontract_address, settestamentcontract_address) VALUES (?,?,?)"
    db.query(sqlInsert, [account_address, maincontract_address, settestamentcontract_address],(err,result)=>{
        console.log(result)
    });   
});

app.post("/api/insertactivatebackup", (req,res)=>{
    const account_address = req.body.account_address;
    const backupcontract_address = req.body.backupcontract_address;
    const activatebackup_address = req.body.activatebackup_address;
    const sqlInsert = "INSERT INTO activatebackupcontract (account_address, backupcontract_address, activatebackup_address) VALUES (?,?,?)"
    db.query(sqlInsert, [account_address, backupcontract_address, activatebackup_address],(err,result)=>{
        console.log(result)
    });   
});

app.post("/api/add", (req,res)=>{
    const account_address = req.body.account_address;
    const bene_mail = req.body.bene_mail;
    const bene_rate = req.body.bene_rate;
    const sqlInsert_2 = "INSERT INTO testament_rate (account_address, bene_mail, bene_rate) VALUES (?,?,?)"
    db.query(sqlInsert_2, [account_address, bene_mail, bene_rate],(err,result)=>{
        console.log(result)
    });
})


app.get("/api/getcontract/:add", (req,res)=>{
    const accaddress = req.params.add;
    db.query("SELECT maincontract_address FROM maincontract WHERE account_address = ?", accaddress, (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
    );   
    });

app.get("/api/getbackupcontract/:add", (req,res)=>{
    const accaddress = req.params.add;
    db.query("SELECT backupcontract_address FROM backupcontract WHERE account_address = ?", accaddress, (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
    );   
    });


app.get("/api/getactivatebackupcontract/:acc/:back", (req,res)=>{
    const accaddress = req.params.acc;
    const backaddress = req.params.back;
    db.query("SELECT activatebackup_address FROM activatebackupcontract WHERE account_address = ? AND backupcontract_address = ?", [accaddress,backaddress], (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
    );   
    });

app.get("/api/getbackupcontract/:back", (req,res)=>{
    const backaddress = req.params.back;
    db.query("SELECT backupcontract_address FROM backupcontract WHERE backupcontract_address = ?", backaddress, (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
    );   
    });

app.get("/api/getmaincontract/:back", (req,res)=>{
    const backaddress = req.params.back;
    db.query("SELECT maincontract_address FROM backupcontract WHERE backupcontract_address = ?", backaddress, (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
    );   
    });

app.get("/api/getsetcontract/:add", (req,res)=>{
    const accaddress = req.params.acc;
    const mainaddress = req.params.back;
    db.query("SELECT settestamentcontract_address FROM settestamentcontract WHERE account_address = ? AND maincontract_address = ?", [accaddress,mainaddress], (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
);   
});

app.get("/api/getsetcontractt/:acc", (req,res)=>{
    const accaddress = req.params.acc;
    db.query("SELECT settestamentcontract_address FROM settestamentcontract WHERE account_address = ? ", [accaddress], (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
);   
});

app.get("/api/getcontractforset/:add", (req,res)=>{
    const accaddress = req.params.add;
    db.query("SELECT maincontract_address FROM settestamentcontract WHERE account_address = ?", [accaddress], (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
);   
});

// delete
app.delete('/api/deletemain/:main',(req,res)=>{
    const maincontract_address = req.params.main;
    
    db.query("DELETE FROM maincontract WHERE maincontract_address= ?", maincontract_address, (err,result)=>{
        if(err) {
        console.log(err)
        } 
    })
})

   
app.delete('/api/deleteback/:back',(req,res)=>{
    const backupcontract_address = req.params.back;
    
    db.query("DELETE FROM backupcontract WHERE backupcontract_address= ?", backupcontract_address, (err,result)=>{
        if(err) {
        console.log(err)
        } 
    })
})

app.delete('/api/deleteactivateback/:back',(req,res)=>{
    const backupcontract_address = req.params.back;
    
    db.query("DELETE FROM activatebackupcontract WHERE backupcontract_address= ?", backupcontract_address, (err,result)=>{
        if(err) {
        console.log(err)
        } 
    })
})




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
