const express = require('express');
const app = express();
const expressSession = require('express-session');
const options = { secret: 'open', resave: false, saveUninitialized: true };

app.use(expressSession(options));

app.get('/viewcount', (req,res) => {
    if(req.session.viewcount) {
        req.session.viewcount++;
    } else {
        req.session.viewcount = 1;
    }
    res.send(`You have viewed this page ${req.session.viewcount} times`);   
})

app.get('/register', (req,res) => {
    const {username = 'Anonymous'} = req.query;
    req.session.username = username;
    res.redirect('/user');
})

app.get('/user', (req,res) => {
    const {username} = req.session;
    if(username) {
        res.send(`Hello, ${username}`);
    } else {
        res.send('You are not registered');
    }
})   

app.listen(3000,() => {
    console.log('Server is running on port 3000');
});