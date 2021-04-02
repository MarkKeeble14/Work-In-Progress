const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;
const get = 'GET';
const post = 'POST';
const put = 'PUT';
const options = 'OPTIONS';
const root = '/Work-in-Progress'
const apiRoot = '/API/v1';
const endPointRoot = root + apiRoot;

// parse application/json
app.use(bodyParser.json())

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With, application/json");

    next();
});

// Database
// Create Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "markkeeb_mark",
    password: "markkeeble14",
    database: "markkeeb_wip",
    multipleStatements: true
});

app.use(express.static(__dirname));

const viewPath = '/views';

app.get(root + '/', function(req,res){
    res.sendFile(__dirname + viewPath + '/landing.html');
});

app.get(root + '/projects', function(req,res){
    res.sendFile(__dirname + viewPath + '/index.html');
});

app.get(root + '/profile', function(req,res){
    res.sendFile(__dirname + viewPath + '/profile.html');
});

app.get(root + '/post', function(req,res){
    res.sendFile(__dirname + viewPath + '/post.html');
});


// Endpoints
// 3 POST

// Create Account (landing)
app.post(endPointRoot + '/signup', (req, res) => {
    const email = req.body.email;
    const dName = req.body.displayName;
    const password = req.body.password;
    
    let query = "INSERT INTO Accounts (email, password, display_name) VALUES ('" + email + "', '" + password + "', '" + dName + "')";
    
    db.query(query + ';' + GetUpdateStatement('/signup', 'POST'), (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// Create Project (post)
app.post(endPointRoot + '/projects/create', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const tagList = req.body.tagList;
    const owner = req.body.ownerId;
    
    let query = "INSERT INTO Projects (owner_id, title, description, tag_list) VALUES (" + owner + ", '" + title + "', '" + description + "', '" + tagList + "')";
    
    db.query(query + ';' + GetUpdateStatement('/projects/create', 'POST'), (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send(result);
        }
    });
    
    res.send(title);
});

// Make Comment on Someone Elses Profile (profile)
app.post(endPointRoot + '/profile/:id/comment', (req, res) => {
    const id = req.params.id;
    const from = req.body.from;
    const contents = req.body.text;
    
    let query = "INSERT INTO Profile_Comments (user_made_comment, user_recieved_content, comment_content) VALUES ('" 
        + from + "', '" + id + "', '" + contents + "')";
    
    db.query(query + ';' + GetUpdateStatement('/profile/:id/comment', 'POST'), (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// 2 DELETE

// Delete Project As Owner (profile?)
app.delete(endPointRoot + '/profile/:id/:projectId', (req, res) => {
    const id = req.params.id;
    const projectId = req.params.projectId;

    let query = "DELETE FROM Projects WHERE id = " + projectId + " AND owner_id = " + id;

    db.query(query + ';' + GetUpdateStatement('/profile/:id/:projectId', 'DELETE'), (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
});

// Delete Account
app.delete(endPointRoot + '/profile/:id', (req, res) => {
    const owner = req.params.id;

    let query = "DELETE FROM Accounts WHERE id = " + id;

    db.query(query + ';' + GetUpdateStatement('/profile/:id', 'DELETE'), (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
});

// 2 PUT

// Update Project (profile?)
app.put(endPointRoot + '/profile/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    
    let body = "";
    req.on('data', function (chunk) {
        if (chunk != null) {
            body += chunk;
            console.log(body);
        }
    });
    
    const title = 'mbdtf';
    const description = 'a short description';
    const tag_list = 'here,are,some,tags';
    
    req.on('end', function() {
        let query = "UPDATE Projects SET (title = '" + title + "', description ='" 
            + description + "', tag_list = '" + tag_list + "') WHERE id = " +  projectId;
        db.query(query + ';' + GetUpdateStatement('/profile/projects/:projectId', 'PUT'), (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
        res.send(body);
    })
});

// Update Account Info (profile)
app.put(endPointRoot + '/profile/:id', (req, res) => {
    const id = req.params.id;
    
    const display_name = req.body.dName;
    const email = req.body.email;
    const url = req.body.personalURL;
    const type = req.body.accType;

    let query = "UPDATE Accounts SET (email = '" + email + "', display_name = '" + display_name + "', personal_website_url = '" + url + "', account_type = '" + type + "') WHERE id = " + id;
    db.query(query + ';' + GetUpdateStatement('/profile/:id', 'PUT'), (err, result) => {
        if (err) {
            throw err;
            res.send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// 1 GET

// Get All Projects (index)
app.get(endPointRoot + '/projects/fetch', (req,res) => {
    let query = 'SELECT * FROM `Accounts`';
    
    db.query(query + ';' + GetUpdateStatement('/projects/fetch', 'GET'), (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// Get Account Information (profile)
app.get(endPointRoot + '/profile/:id', (req,res) => {
    const id = req.params.id;
    let query = "SELECT * FROM `Accounts` WHERE id = " + id;

    db.query(query + ';' + GetUpdateStatement('/profile/:id', 'GET'), (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send(result[0]);
        }
    });
});

// Get Account Projects (profile)
app.get(endPointRoot + '/profile/:id/projects', (req,res) => {
    const id = req.params.id;
    let query = "SELECT * FROM `Projects` WHERE owner_id = " + id;

    db.query(query + ';' + GetUpdateStatement('/profile/:id', 'GET'), (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send(result[0]);
        }
    });
});


// GET Admin / Endpoint Info
app.get(endPointRoot + '/admin', (req,res) => {
    let query = 'SELECT * FROM `Endpoints`';
    
    db.query(query + ';' + GetUpdateStatement('/admin', 'GET'), (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// Update the Admin Table
function GetUpdateStatement(endpoint, method) {
    let apiEndpoint = apiRoot + endpoint;
    let updateStatement = "UPDATE Endpoints SET uses = ( Select uses FROM Endpoints WHERE endpoint = '" + apiEndpoint + "' AND method ='" + method + "' ) + 1 WHERE endpoint = '" + apiEndpoint + "' AND method ='" + method + "';";
    return updateStatement;
}

// Run
app.listen(process.env.port || port, function () {
    console.log('Work-In-Progress App listening on port ' + port);
});