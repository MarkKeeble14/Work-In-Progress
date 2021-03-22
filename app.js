const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const port = 3000;

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

app.use('/', router);
app.listen(process.env.port || port, function () {
    console.log('Work-In-Progress App listening on port ' + port);
});