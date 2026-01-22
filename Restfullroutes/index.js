const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const {v4:uuid} = require('uuid');      //importing uuid to generate unique ids
const methodOverride = require('method-override');


app.use(methodOverride('_method'));                                                            //use to override methods
app.use(express.urlencoded({ extended: true }));                                               //use to parse URL-encoded bodies   
app.use(express.json());                                                                        //use to parse JSON bodies
app.set('views', path.join(__dirname, 'views'));                                             //set the views directory
app.set('view engine', 'ejs');

let comments = [
    { id: uuid(), username: 'Alice', comment: 'This is great!' },
    { id: uuid(), username: 'Bob', comment: 'I love this!' },
    { id: uuid(), username: 'Charlie', comment: 'Very informative.' },
    { id: uuid(), username: 'David', comment: 'Thanks for sharing!' },
    { id: uuid(), username: 'Eve', comment: 'Awesome content!' }
]

//set EJS as the templating engine

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })                     // handling GET requeest//
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')                     // handling GET requeest to show form//
})


app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment , id : uuid()});                       //accessing username and comment from req.body
    res.redirect('/comments');                                  //redirecting to /comments route
})


app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })                     //handling GET request to show specific comment//
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');                                  //redirecting to /comments route    

})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment }) 
    })                 

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);                             //removing the comment from the array
    res.redirect('/comments');                                 
})

app.get('/kurkure', (req, res) => {
    res.send('GET _its plastic and spicy snack')                    //handling GET request
})

app.post('/kurkure', (req, res) => {
    const { shape, qty } = req.body;
    res.send('POST _its plastic and picy snack {shape: ' + shape + ', qty: ' + qty + '}');             //accessing shape and qty from req.body
})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})