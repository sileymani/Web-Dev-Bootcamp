//Modules
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const methodOverride = require('method-override');
const colors = require('colors');


const app = express()

//MiddleWares & Stuff

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Models
const Product = require('./models/product')

//Routes

//Route for convenience
app.get('/', (req, res) => {
    console.log(`GET / request\n`.magenta)
    res.redirect('/products')
})

//Index
app.get('/products', async (req, res) => {
    console.log(`GET /products request\nIndex\n`.magenta)
    const products = await Product.find({})
    // console.log(products)
    res.render('./products/index.ejs', { products })
})

//FilteredIndex
app.post('/products/f', async (req, res) => {
    console.log(`POST /products/f request\nFilter\n`.magenta)
    let { cat } = req.body
    const products = await Product.find({ category: cat })

    res.render('./products/index.ejs', { products })
})

//New
app.get('/products/new', async (req, res) => {
    console.log(`GET /products/new request\nNew\n`.magenta)
    res.render('./products/new.ejs')
})

//Create
app.post('/products', async (req, res) => {
    console.log(`POST /products request\nCreate\n`.magenta)
    let { name, price, onSale, qty, category } = req.body
    onSale = onSale === 'on' ? true : false
    price = parseFloat(price)
    qty = parseInt(qty)

    const product = new Product({
        name: name,
        price: price,
        onSale: onSale,
        qty: qty,
        category: category
    })

    await product.save()

    res.redirect(`/products`)
})

//Show
app.get('/products/:id', async (req, res) => {
    let { id } = req.params;
    console.log(`GET /products/${id} request\nShow\n`.magenta)
    let product = await Product.findById(id)
    // console.log(Object.entries(product)[2][1])]
    res.render('./products/show.ejs', { product })
})

//Edit
app.get('/products/:id/edit', async (req, res) => {
    let { id } = req.params;
    console.log(`GET /products/${id}/edit request\nEdit\n`.magenta)
    let product = await Product.findById(id)
    res.render('./products/edit.ejs', { product });
})

//Update
app.put('/products/:id', async (req, res) => {
    let { id } = req.params;
    console.log(`PUT /products/${id} request\nUpdate\n`.magenta)
    let { price, onSale, qty, category } = req.body

    const product = await Product.findById(id);

    // Verifications
    product.price = typeof parseFloat(price) === "number" && !isNaN(price) ? price : product.price // Si produit est un number et n'est pas Nan
    product.qty = typeof parseInt(qty) === "number" && !isNaN(qty) ? qty : product.qty // Pareil
    product.onSale = onSale ? true : false // Si onSale est definit est true, si elle n'est pas definie c'est false
    product.category = category ? category : product.category // Pareil mais si true ca va sinon on remet la meme valeur
    await product.save()


    //Other way:
    // Product.updateOne({ _id: id }, {
    //     price: price,
    //     qty: qty,
    //     onSale: onSale,
    //     category: category
    // }, { new: true }, { runValidators: true })
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))

    res.redirect(`/products/${id}`)
})

//Destroy
app.delete('/products/:id', async (req, res) => {
    let { id } = req.params
    console.log(`DELETE /products/${id} request\nDestroy\n`.magenta)
    await Product.deleteOne({ _id: id })

    res.redirect('/products')
})

//Server & Database
app.listen(4000, () => {
    console.log('--------------listening on 4000--------------'.bgBlue)
})

const DB = 'farmStand';

mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
    .then(() => console.log(`-------connected to ${DB} database-------`.bgGreen))
    .catch(err => console.log(err))