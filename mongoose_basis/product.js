const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieApp',)
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)

    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    category: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        Instore :{
    type: Number,
    default: 0
}
    }

});


const Product = mongoose.model('Product', productSchema);

const bike = new Product({ name: 'Mountain Bike', price: 500, category: ['bike', 'cycle'], qty: { online: 10, Instore: 20 } });    //// name should require and type string // //price should be number //

bike.save()
    .then(data => {
        console.log("IT WORKED!!")
        console.log(data)
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })