const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
app.use(express.urlencoded({extended:false}));

const port = 3000;

const utenti = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Utenti'
});



utenti.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.use(bodyParser.json());



// app.get('/userr', (req,res)=>{
//     let sql = 'SELECT * FROM userr WHERE userr.email = ? AND userr.passw = ?';
//     let values = [req.body.email, req.body.passw];
//     let query = utenti.query(sql, values, (err, results) => {
//         if (err) throw err;
//         res.sendFile(path.join(__dirname ,'/index.html'));
//     });
// });



app.post('/userr', (req,res)=>{
    let sql = 'SELECT * FROM userr WHERE userr.email = ?';
    let values = [req.body.email];
    let query = utenti.query(sql, values, (err, results) => {
        if (err) throw err;
        
        if(results.length===0)
       {
         return res.redirect('/');
       } 

        const passw=results[0].passw;
        if(passw == req.body.passw)
        {
           return res.sendFile(path.join(__dirname ,'/index.html'));
        }
        else
        {
           return res.redirect('/');
        }


       
    });
});




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'/login.html'));
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});