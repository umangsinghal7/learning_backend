
const express  = require('express');
const app = express();
const path = require ('path');
const port = 3000;
const expresssession = require('express-session');
const flash = require('connect-flash');

const methodOverride = require('method-override');

const categories = ['fruit', 'vegetable', 'dairy'];

const mongoose = require('mongoose');

const Farm = require('./modals/farm');

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

const options = { secret: 'open', resave: false, saveUninitialized: true };
app.use(expresssession(options));
app.use(flash());  //flash should be used after session

//FARM ROUTES
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/home', { farms });
});

app.get('/farms/:id', async (req, res) => { 
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm });
});

app.delete('/farms/:id', async (req, res) => {
    const { id } = req.params;
    await Farm.findByIdAndDelete(id);
    res.redirect('/farms');
});

app.get('/farms/new', (req, res) => {
    res.render('farms/new');
});

app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    req.flash('success', 'Successfully made a new farm!');
    res.redirect('/farms');
});

app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm });
});

app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const product = new Product(req.body);
    product.farm = farm;
    await product.save();
    farm.products.push(product);
    await farm.save();
    res.redirect(`/farms/${id}`);
});


//PRODUCT ROUTES

app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
});

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category});
        res.render('products/home', { products, category });
    }else{
        const products = await Product.find({});
        res.render('products/home', { products, category: 'All' });
    }
});

app.get('/products/new', (req, res) =>  {
    res.render('products/new', { categories });
});

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    req.flash('success', 'Successfully made a new product!');
    res.redirect(`/products/${newProduct._id}` );
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm', 'name');
    res.render('products/show', { product });
})

app.get('/products/:id/edit', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit',{ product , categories });
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
