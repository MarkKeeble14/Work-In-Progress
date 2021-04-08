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
app.use(bodyParser.json());

const corsOptions = {
  "origin": '*',
  "methods": 'GET, PUT, POST, DELETE',
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
}
app.use(cors(corsOptions));

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
    res.end("Connected to Mark Keeble & Justin Xie - Projects API\n API root: " + apiRoot + "\n");
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
    
    if (email == undefined || dName == undefined || password == undefined) {
         res.status(400).send();
    } else {
        let query = "INSERT INTO Accounts (email, password, display_name) VALUES ('" + email + "', '" + password + "', '" + dName + "')";
    
        db.query(query + ';' + GetUpdateStatement('/signup', 'POST'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(201).send(result[0]);
            }
        });    
    }
});

// Create Project (post)
app.post(endPointRoot + '/projects/create', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const tagList = req.body.tagList;
    const owner = req.body.ownerId;
    
    if (title == undefined || description == undefined || tagList == undefined || owner == undefined) {
        res.status(400).send();
    } else {
        let query = "INSERT INTO Projects (owner_id, title, description, tag_list) VALUES (" + owner + ", '" + title + "', '" + description + "', '" + tagList + "')";
    
        db.query(query + ';' + GetUpdateStatement('/projects/create', 'POST'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(201).send(result);
            }
        });
    }
});

// Make Comment on Someone Elses Profile (profile)
app.post(endPointRoot + '/profile/:id/comment', (req, res) => {
    const id = req.params.id;
    const from = req.body.from;
    const contents = req.body.text;
    
    if (id == undefined || from == undefined || contents == undefined) {
        res.status(400).send();
    } else {
        let query = "INSERT INTO Account_Comments (user_made_comment_id, user_recieved_comment_id, comment_content) VALUES ('" 
        + from + "', '" + id + "', '" + contents + "')";
    
        db.query(query + ';' + GetUpdateStatement('/profile/:id/comment', 'POST'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(201).send(result);
            }
        });    
    }
});

// Authenticate
app.post(endPointRoot + '/authenticate', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    if (email == undefined || password == undefined) {
        res.status(400).send();
    } else {
        let query = "SELECT id, email, display_name, personal_website_url, account_type FROM `Accounts` WHERE email = '" + email + "' AND password = '" + password + "'";

        db.query(query + ';' + GetUpdateStatement('/authenticate', 'POST'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                if (result[0].length > 0) {
                    res.status(200).send(result[0]);   
                } else {
                    res.status(403).send(false);
                }
            }
        });    
    }
});

// Admin Authentication
app.post(endPointRoot + '/administration', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    if (email == undefined || password == undefined) {
        res.status(400).send();
    } else {
        let query = "SELECT id, email, display_name, personal_website_url, account_type FROM `Accounts` WHERE email = '" + email + "' AND password = '" + password + "' AND account_type = 'admin'";

        db.query(query + ';' + GetUpdateStatement('/administration', 'POST'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                if (result[0].length > 0) {
                    res.status(200).send(result[0]);   
                } else {
                    res.status(403).send(false);
                }
            }
        });    
    }
});



// Join new project
app.post(endPointRoot + '/profile/:userId/:projectId', (req,res) => {
    const userId = req.params.userId;
    const projectId = req.params.projectId;
    
    if (userId == undefined || projectId == undefined) {
        res.status(400).send();
    } else {
        let query = "INSERT INTO Account_Projects (account_id, project_id) VALUES ('" + userId + "', '" + projectId + "')";

        db.query(query + ';' + GetUpdateStatement('/profile/:userId/:projectId', 'POST'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(201).send(result); 
            }
        });    
    }
});

// 2 DELETE

// Leave project as a user
app.delete(endPointRoot + '/profile/:userId/projects/:projId/leave', (req, res) => {
    const id = req.params.userId;
    const projectId = req.params.projId;

    if (id == undefined || projectId == undefined) {
        res.status(400).send();
    } else {
        let query = "DELETE FROM Account_Projects WHERE account_id = " + id + " AND project_id = " + projectId;

        db.query(query + ';' + GetUpdateStatement('/profile/:userId/projects/:projId/leave', 'DELETE'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        })    
    }
});

// Delete Project as an owner
app.delete(endPointRoot + '/profile/:userId/projects/:projId/delete', (req, res) => {
    const id = req.params.userId;
    const projectId = req.params.projId;
    
    if (id == undefined || projectId == undefined) {
        res.status(400).send();
    } else {
        let query = "DELETE FROM Projects WHERE owner_id = " + id + " AND id = " + projectId;
        
        db.query(query + ';' + GetUpdateStatement('/profile/:userId/projects/:projId/delete', 'DELETE'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(204).send(result);
            }
        })   
    }
});

// Delete Account
app.delete(endPointRoot + '/profile/:id/delete', (req, res) => {
    const id = req.params.id;

    if (id == undefined) {
        res.status(400).send();
    } else {
        let query = "DELETE FROM Accounts WHERE id = " + id;
        
        db.query(query + ';' + GetUpdateStatement('/profile/:id/delete', 'DELETE'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(204).send(result);
            }
        });   
    }
});

// 2 PUT

// Update Account Info (profile)
app.put(endPointRoot + '/profile/:id', (req, res) => {
    const id = req.params.id;
    
    const display_name = req.body.dName;
    const email = req.body.email;
    const url = req.body.personalURL;
    const type = req.body.accType;
    
    if (display_name == undefined || email == undefined || url == undefined || type == undefined) {
        res.status(400).send();
    } else {
        let query = "UPDATE Accounts SET email = '" + email + "', display_name = '" + display_name + "', personal_website_url = '" + url + "', account_type = '" + type + "' WHERE id = " + id;

    
        db.query(query + ';' + GetUpdateStatement('/profile/:id', 'PUT'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        });    
    }
});

// Update Project info
app.put(endPointRoot + '/projects/:id', (req, res) => {
    const id = req.params.id;
    
    const title = req.body.title;
    const description = req.body.description;
    const tagList = req.body.tagList;
    
    if (title == undefined || description == undefined || tagList == undefined) {
        res.status(400).send();
    } else {
        let query = "UPDATE Projects SET title = '" + title + "', description = '" + description + "', tag_list = '" + tagList + "' WHERE id = " + id;

        db.query(query + ';' + GetUpdateStatement('/projects/:id', 'PUT'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        });    
    }
});

// 1 GET

// Get All Projects (index)
app.get(endPointRoot + '/projects/fetch', (req,res) => {
    let query = 'SELECT * FROM `Projects`';
    
    db.query(query + ';' + GetUpdateStatement('/projects/fetch', 'GET'), (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// Get Account Information (profile)
app.get(endPointRoot + '/profile/:id', (req,res) => {
    const id = req.params.id;
    
    if (id == undefined) {
        res.status(400).send();
    } else {
        let query = "SELECT id, email, display_name, personal_website_url, account_type FROM `Accounts` WHERE id = " + id;

        db.query(query + ';' + GetUpdateStatement('/profile/:id', 'GET'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(result[0]);
            }
        });    
    }
});

// Get Account Projects
app.get(endPointRoot + '/profile/:id/projects', (req,res) => {
    const id = req.params.id;
    
    if (id == undefined) {
        res.status(400).send();
    } else {
       let query = "SELECT * FROM `Account_Projects` INNER JOIN `Projects` ON Account_Projects.project_id = Projects.id WHERE account_id = " + id;

        db.query(query + ';' + GetUpdateStatement('/profile/:id/projects', 'GET'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(result[0]);
            }
        }); 
    }
});

// Get Projects the user with the given id owns
app.get(endPointRoot + '/profile/:id/projects/owned', (req,res) => {
    const id = req.params.id;
    
    if (id == undefined) {
        res.status(400).send();
    } else {
        let query = "SELECT * FROM `Projects` WHERE owner_id = " + id;

        db.query(query + ';' + GetUpdateStatement('/profile/:id/projects/owned', 'GET'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(result[0]);
            }
        });    
    }
});

// Get Account Comments (profile)
app.get(endPointRoot + '/profile/:id/comments', (req,res) => {
    const id = req.params.id;
    
    if (id == undefined) {
        res.status(400).send();
    } else {
        let query = "SELECT * FROM `Account_Comments` WHERE user_recieved_comment_id = " + id;
    
        db.query(query + ';' + GetUpdateStatement('/profile/:id/comments', 'GET'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(result[0]);
            }
        });     
    }
});

// Get Project Information
app.get(endPointRoot + '/projects/:id', (req,res) => {
    const id = req.params.id;
    
    if (id == undefined) {
        res.status(400).send();
    } else {
        let query = "SELECT * FROM `Projects` WHERE id = " + id;

        db.query(query + ';' + GetUpdateStatement('/projects/:id', 'GET'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(result[0]);
            }
        });    
    }
});

// Get whether or not the given user is the project owner
app.get(endPointRoot + '/profile/:userId/projects/:projId', (req, res) => {
    const id = req.params.userId;
    const projectId = req.params.projId;

    if (id == undefined || projectId == undefined) {
        res.status(400).send();
    } else {
        let query = "SELECT * FROM Projects WHERE id = " + projectId + " AND owner_id = " + id;

        db.query(query + ';' + GetUpdateStatement('/profile/:userId/projects/:projId', 'GET'), (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                if (result[0].length > 0) {
                    res.status(200).send(true);   
                } else {
                    res.status(200).send(false);
                }
            }
        });    
    }
});

// GET Admin / Endpoint Info
app.get(endPointRoot + '/admin', (req,res) => {
    let query = 'SELECT * FROM `Endpoints`';
    
    db.query(query + ';' + GetUpdateStatement('/admin', 'GET'), (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
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