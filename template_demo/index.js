const express = require('express');
const app = express();
const path = require('path');
const port = 6969

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/home', (req,res) => {
    res.render('home')
})


app.listen(port, () => {
    console.log('listening to port 6969')
})