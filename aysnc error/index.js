const express  = require('express');
const app = express();
const path = require ('path');
const port = 3000;
const AppError = require('./AppError');

const methodOverride = require('method-override');

const categories = ['fruit', 'vegetable', 'dairy'];

const mongoose = require('mongoose');

const Product = require('./modals/product');
mongoose.connect('mongodb://localhost:27017/umangfarm2')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO ERROR!!!!")
        console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(e => next(e));
    }
}

app.get('/products', wrapAsync(async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category});
        res.render('products/home', { products, category });
    }else{
        const products = await Product.find({});
        res.render('products/home', { products, category: 'All' });
    }
}));

app.get('/products/new', (req, res) =>  {
    res.render('products/new', { categories });
});

app.post('/products', wrapAsync(async (req, res,next) => {
    
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
}));

app.get('/products/:id', wrapAsync(async (req, res,next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product){
        throw next(new AppError('Product Not Found', 404));
    }
    res.render('products/show', { product });
}))

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        throw next(new AppError('Product Not Found', 404));
    }
    res.render('products/edit',{ product , categories });

}));

app.put('/products/:id', wrapAsync(async (req, res ,next ) => {
    
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    res.redirect(`/products/${product._id}`);
    
}));

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

const handleValidationError = err => {
    console.dir(err);
    return new AppError(`Validation Failed... ${err.message}`, 400);
}

app.use((err,req, res,next) => {
    console.log(err.name);
    if(err.name === 'ValidationError') err = handleValidationError(err);
        
    next(err);
});

app.use((err,req, res,next) => {
    const{  status = 500, message = 'Something went wrong!' } = err;
    res.status(status).send( message);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
