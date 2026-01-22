const express = require('express')        //import express
const app = express()                //create an express app
const port = 7755                 //define a port   

app.get('/', (req, res) => {
  res.send('this is my homepage!')      //root route    this is called routing
})

app.get('/umang/:height/:weight', (req, res) => {
  const{height, weight} = req.params
  res.send('<h1>Height: ' + height + ', Weight: ' + weight + '</h1>')     //dynamic route with parameters
})

app.post('/cats', (req, res) => {
  res.send('thuis is post req diff from get!')   //post route
})

app.get('/cats', (req, res) => {
  res.send('hyy kittens and pusssyyy!')    //get route
})

app.get('/dogs', (req, res) => {
  res.send('hyy puppies!')        //get route
}) 

app.get('/search', (req, res) => {
  const{q} = req.query;
  if(!q){
    return res.send('<h1>Nothing found if nothing searched</h1>')
  }
  res.send('<h1>Search results for: ' + q + '</h1>' )   //query parameters
})


app.use((req, res) => {
  res.send("dk path ask someone else");   //default route for undefined paths
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)    //listener
})
