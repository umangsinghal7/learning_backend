const express = require ('express');
const app = express();
const port = 3000;
const morgan = require('morgan');     // Importing morgan middleware
const AppError = require('./AppError');

app.use(morgan('dev'));              // Using morgan middleware for logging


app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(`${req.method} ${req.path}`);
    next(); // Pass control to the next middleware
});

app.use('/dogs', (req, res, next) => {
    console.log('I LOVE DOGS!');
    next(); // Pass control to the next middleware
});




const passwordCheck = (req, res, next) => {
    const{password} = req.query;
    if(password === 'umang'){
        return next(); // Password is correct, proceed to the next middleware
    }
    // res.send('SORRY YOU NEED A PASSWORD!'); // Password is incorrect, send a response   
    // next(); // Pass control to the next middleware
//  throw new Error('PASSWORD REQUIRED!'); // Trigger error handling middleware
    throw new AppError('PASSWORD REQUIRED!', 401);

};

// app.use((req, res, next) => {
//     console.log('Middleware 1');
//     next(); // Pass control to the next middleware
// })

// app.use((req, res, next) => {
//     console.log('Middleware 2');
//     next(); // Pass control to the next middleware
// })

// app.use((req, res, next) => {
//     console.log('Middleware 3');
//     next(); // Pass control to the next middleware
// })


app.get('/' , (req, res) => {
    console.log(`Request Time: ${req.requestTime}`);
    res.send('Hello, World!');
});

app.get('/dogs' , (req, res) => {
    console.log(`Request Time: ${req.requestTime}`);
    res.send('woof ,woof');
});

app.get('/error' , (req, res) => {  
    chicken.fly(); // This will cause an error since 'chicken' is not defined
})

app.get('/secret' , passwordCheck ,( req, res) => {
    res.send('MY SECRET IS: I LOVE EXPRESS!');
});

app.get('/admin' , ( req, res) => {
    throw new AppError('YOU ARE NOT AN ADMIN!', 403);
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// app.use((err, req, res, next) => {
//     console.log('**************');
//     console.log('********ERROR**********');
//     console.log('**************');
//     res.status(500).send(`OH NO! SOMETHING WENT WRONG! ${err.message}`);
// })

app.use((err, req, res, next) => {
    const{  status = 500, message = 'Something went wrong!' } = err;
    res.status(status).send( message);
})

app.listen(port,() =>{
    console.log(`Server is running on http://localhost:${port}`);   
});