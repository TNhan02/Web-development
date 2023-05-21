'use strict'
var express = require('express');
var mysql = require('mysql');
var app = express();

const mydb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '171002',
    database: 'webdevelopment'
})
mydb.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Database connected');
    }
})

//access to user table in database
app.get('/users/', function (request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    mydb.query('SELECT * FROM user', (error, result) => {
        if(error) throw error;

        response.send(result);
    })
})


//this is what server.js uses
module.exports = {
    Login: function (req, res) {
        const idUser = req.params.idUser;

        //retrieve a row from MySQL database
        mydb.query('SELECT * FROM user WHERE idUser = ?', [idUser], (error, result) => {
            if (error) throw error;

            // output result from query
            console.log(result);
            if (result.length > 0) {
                const user = {
                    idUser: result[0].idUser,
                    password: result[0].password
                };
                res.json(user);
            } else {
                res.send('User Not Found');
            }
        });
    },

    addAccount: function (req, res) {
        console.log("Body = " + JSON.stringify(req.body));

        const query = 'INSERT INTO user VALUES (?,?)';
        const values = [req.body.idUser, req.body.password];

        mydb.query(query, values, (error, result) => {
            if (error) throw error;

            console.log(values);
            res.status(201);
            res.send({ message: "New Account Registered!!!" });
        });
    },

    deleteAccount: function (req, res){
        console.log("Body = " + JSON.stringify(req.body));

        const query = 'DELETE FROM user WHERE ?';
        const idUser = req.body.idUser;

        mydb.query(query,idUser, (error, result) => {
            if(error) throw error;

            res.status(201);
            res.send({message: "Delete Account Success"})
        })
    }
}