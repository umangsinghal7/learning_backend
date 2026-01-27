const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({    //defining schema    
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min : 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
    
})
const Product = mongoose.model('Product', productSchema);              //compiling schema into model

    module.exports =  Product;       //exporting the model