const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const personSchema = new mongoose.Schema({    //defining schema
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`                             //virtual property fullName
})

personSchema.pre('save', async function () {
    this.first = 'YO';
    this.last = 'MAMA';                                             //pre save middleware to modify first and last name before saving
    console.log("ABOUT TO SAVE!!!!")
})
personSchema.post('save', async function () {
    console.log("JUST SAVED!!!!")                               //post save middleware to log after saving//
})


const Person = mongoose.model('Person', personSchema);              //compiling schema into model

