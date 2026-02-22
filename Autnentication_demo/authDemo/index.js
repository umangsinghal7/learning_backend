const express = require('express')
const port = 3000
const app = express()
const User = require('./models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')

mongoose.connect('mongodb://localhost:27017/authDemo', {
}).then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.error('Error connecting to MongoDB:', err)
})

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(session({secret:'tmy'}))

const requireLogin = (req,res,next) => {
    if(!req.session.user_id){
        return res.redirect('/login');
    } else {
        next();
    }
}

app.get('/register',  (req,res) => {
    res.render('register');
})

app.post('/register', async (req,res) => {
    const { username, password } = req.body;
        const newUser = new User({username, password});
        await newUser.save();
        req.session.user_id = newUser._id;
        res.redirect('/user');
    })

    app.get('/login', (req,res) => {
        res.render('login');
    })

    app.post('/login', async (req,res) => {
        const { username, password } = req.body;
        const foundUser = await User.findAndValidate(username, password);
        if (foundUser) {
            req.session.user_id = foundUser._id;
            res.redirect('/user');
        } else {
            res.redirect('/login');
        }
    })

app.post('/logout', (req,res) => {
    // req.session.user_id = null;
    req.session.destroy();
    res.redirect('/login');
})

app.get('/user', requireLogin, (req,res) => {
        res.render('secret');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})