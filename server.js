var express = require('express');
var mysql = require('mysql');
var app = express();
var path = require('path');
const http = require('http');
const url = require('url');


var fs = require("fs"); //enables fs( File System) module

// body-parser module is used to parse body in http requests to js objects
var bodyParser = require('body-parser');

// we'll use controller to routes to controller that handles spesific routes
var controller = require('./controller');
const { json } = require('body-parser');

// enable body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // that can handle json

const hostname = '127.0.0.1'; // ip address of computer running this code = localhost
const port = process.env.PORT || 3000;


// Static files can be added to public folder. There can be pictures, css-files for ui, js-files for ui
app.use(express.static('public', {
    //set up MIME type
    setHeaders: function (res, path) {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

//url of pages
app.get('/', function (request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.sendFile('public/MainPage.html', { root: __dirname });
})

app.get('/public/InstructionManual.html', function (request, response) {
    response.statusCode = 200;
    response.sendFile('public/html/InstructionManual.html', { root: __dirname });
})

app.get('/public/EffectivenessPage.html', function (request, response) {
    response.statusCode = 200;
    response.sendFile('public/html/EffectivenessPage.html', { root: __dirname });
})

app.get('/public/SpaService.html', function (request, response) {
    response.statusCode = 200;
    response.sendFile('public/html/SpaService.html', { root: __dirname });
})

app.get('/public/CustomerFeedbacks.html', function (request, response) {
    response.statusCode = 200;
    response.sendFile('public/html/CustomerFeedbacks.html', { root: __dirname });
})

app.get('/public/Contact.html', function (request, response) {
    response.statusCode = 200;
    response.sendFile('public/html/Contact.html', { root: __dirname });
})


//redirect to users.html
app.get('/redirect', (req, res) => {
    res.redirect('/public/user.html');
})

//ROUTES//
app.route('/users')
    .post(controller.addAccount)
    .delete(controller.deleteAccount);
    

app.route('/users/:idUser')
    .get(controller.Login);

app.listen(port, hostname, () => {
    console.log(`Server is running AT http://${hostname}:${port}/`);
});