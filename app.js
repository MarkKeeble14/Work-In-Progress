const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');

const app = express();
const port = 3000;

const get = 'GET';
const post = 'POST';
const put = 'PUT';
const options = 'OPTIONS';
const endPointRoot = '/API/v1';

app.use(cors());
// or?
/*
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 
        'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
*/

// Database
// Create Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "markkeeb_nodemysql",
    password: "nodemysql123",
    database: "work-in-progress"
});

app.use(express.static(__dirname + '/public'));
const viewPath = '/views';

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname + viewPath + '/landing.html'))
});

router.get('/projects', function(req,res){
    res.sendFile(path.join(__dirname + viewPath + '/index.html'))
});

router.get('/profile', function(req,res){
    res.sendFile(path.join(__dirname + viewPath + '/profile.html'))
});

router.get('/post', function(req,res){
    res.sendFile(path.join(__dirname + viewPath + '/post.html'))
});

// Endpoints
// 3 POST

// Create Account (landing)
router.post(endPointRoot + '/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    res.send(email);
});

// Create Project (post)
router.post(endPointRoot + '/projects/create', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const tagList = req.body.tagList;
    res.send(title);
});

// Make Comment on Someone Elses Profile (profile)
router.post(endPointRoot + '/profile/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body.user;
    const contents = req.body.contents;
    res.send(id);
});

// 2 DELETE

// Delete Project As Owner (profile?)
router.delete(endPointRoot + '/profile/:id/:projectId', (req, res) => {
    const id = req.params.id;
    const projectId = req.params.projectId;

    db.query('...', (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
});

// Delete Account
router.delete(endPointRoot + '/profile/:id', (req, res) => {
    const id = req.params.id;

    db.query('...', (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
});

// 2 PUT

// Update Project (profile?)
router.put(endPointRoot + '/profile/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    let body = "";
    req.on('data', function (chunk) {
        if (chunk != null) {
            body += chunk;
            console.log(body);
        }
    });
    req.on('end', function() {
        let query = '...';
        db.query(query, (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
        res.send(body);
    })
});

// Update Account Info (profile)
router.put(endPointRoot + '/profile/:id', (req, res) => {
    const id = req.params.id;
    let body = "";
    req.on('data', function (chunk) {
        if (chunk != null) {
            body += chunk;
            console.log(body);
        }
    });
    req.on('end', function() {
        let query = '...';
        db.query(query, (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
        res.send(body);
    })
});

// 1 GET

// Get All Projects (index)
router.get(endPointRoot + '/projects/fetch', (req,res) => {
    db.query('...', (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send(result);
        }
    })
});

// Get Account Information & Projects (profile)
router.get(endPointRoot + '/profile/:id', (req,res) => {
    const id = req.params.id;
    db.query('...', (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send(result);
        }
    })
});

// GET admin stuff
router.get(endPointRoot + '/admin', (req,res) => {
    const id = req.params.id;
    db.query('...', (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send(result);
        }
    })
});

// Run
app.use('/', router);
app.listen(process.env.port || port, function () {
    console.log('Work-In-Progress App listening on port ' + port);
});