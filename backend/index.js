const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();

app.use(cors());
app.use(bodyparser.json());




//database conncetion 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simpledb',
    port: 3306
})

//check database connection 

db.connect(err => {
    if (err) { console.log(err, 'dberr'); }
    console.log('database connected....')
})

//get all data from db 
app.get('/user', (req, res) => {
    // console.log('get users');
    let qr = 'SELECT * from user';

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'all users data',
                data: result
            });
        }

    });
});

//get single data from db 
app.get('/user/:id', (req, res) => {
    // console.log('Singel user');
    // console.log(req.params.id);

    let gID = req.params.id;

    let qr = 'SELECT * from user where id = ?';
    db.query(qr, gID, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            });
        } else {
            res.send({
                message: 'data not found',

            });

        }

    });

});

// create data in db
app.post('/user', (req, res) => {
    // console.log('post data');
    // console.log(req.body, 'create data');
    let fullName = req.body.fullname;
    let Email = req.body.email;
    let Mobile = req.body.mobile;

    let qr = 'insert into user(fullname,email,mobile) values(?,?,?)';

    db.query(qr, [fullName, Email, Mobile], (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        console.log(result, 'result');
        res.send({
            message: 'data inserted'
        });
    });

});

//put data , update data 

app.put('/user/:id', (req, res) => {
    // console.log('update data');
    console.log(req.body, 'update data');

    let gID = req.params.id;
    let fullName = req.body.fullname;
    let Email = req.body.email;
    let Mobile = req.body.mobile;

    let qr = 'update user set fullname = ? , email = ?, mobile = ? where id = ?';
    db.query(qr, [fullName, Email, Mobile, gID], (err, result) => {
        if (err) { console.log(err); }

        res.send({
            message: 'updates successfully'
        });
    });

});


///delete single user 
app.delete('/user/:id', (req, res) => {
    // console.log('delete user')
    let gID = req.params.id
        // console.log(gID)
    let qr = 'delete from user where id = ?';
    db.query(qr, gID, (err, result) => {
        if (err) { console.log(err); }

        res.send({
            message: 'data deleted'
        })
    })



});


app.listen(2000, () => {
    console.log('Server running');
});