// const jokes = require("give-me-a-joke");
// const colours = require("colors");
// jokes.getRandomDadJoke(function(joke) {
//     console.log(joke.rainbow);
// });


const jokes = require("give-me-a-joke");
require("colors");  // You don't assign it to a variable

jokes.getRandomDadJoke(function (joke) {
    console.log(joke.rainbow);
});
