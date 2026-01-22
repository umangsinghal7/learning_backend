const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieApp',)
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)    

})
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema);

const Rockstar = new Movie({title: 'Rockstar', year: 2011, score: 8.2, rating: 'A'});

Movie.insertMany([
    {title  : 'Ironman', year: 2008, score: 7.9, rating: 'A'},
    {title  : 'The Incredible Hulk', year: 2008, score: 6.7, rating: 'B'},
    {title  : 'Thor', year: 2011, score: 7.0, rating: 'A'},
    {title  : 'Captain America: The First Avenger', year: 2011, score: 6.9, rating: 'B'},
    {title  : 'The Avengers', year: 2012, score: 8.0, rating: 'A+'}
])
.then(data => {
    console.log("IT WORKED!!")
    console.log(data)
})