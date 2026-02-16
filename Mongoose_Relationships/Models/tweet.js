const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const userSchema = new Schema({                     //creating a user schema to reference in the tweet schema
    username: String,                           
    age: Number
})

const tweetSchema = new Schema({                        //creating a tweet schema that has a reference to the user schema so we can associate tweets with users
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }                  //reference to User model
})

const User = mongoose.model('User', userSchema);                    //creating the User model so we can reference it in the tweet schema
const Tweet = mongoose.model('Tweet', tweetSchema);                 //creating the Tweet model so we can create tweets and reference users in them

// const makeTweets = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 61 });
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet2 = new Tweet({ text: 'bock bock bock my chickens make noises', likes: 1239 });
//     tweet2.user = user;
//     tweet2.save();
// }

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')
    console.log(t);
}

findTweet();