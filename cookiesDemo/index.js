const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('mysecretkey'));

app.get('/greet', (req,res) => {
    const name = req.cookies.name;
    if(name){
        res.send(`Welcome back, ${name}!`);
    } else {
        res.send("Welcome, new visitor!");
    }
    res.send("heyyy there!");        
})

app.get('/setcookie', (req,res) => {
    res.cookie('name', 'susan');
    res.cookie('age', '30');
    res.send("cookie has been set!");
})

app.get('/getsignedcookie', (req,res) => {
    res.cookie('secretValue', 'this is a secret', {signed: true});
    res.send("signed cookie has been set!");
})

app.get('/verifycookie', (req,res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies);
});

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})