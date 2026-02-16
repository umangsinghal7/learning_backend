const mongoose = require('mongoose');
const { Schema } = mongoose;


const productSchema = new Schema({    //defining schema    
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min : 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm'
    }
    
})
const Product = mongoose.model('Product', productSchema);              //compiling schema into model

    module.exports =  Product;       //exporting the model