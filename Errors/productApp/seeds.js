const mongoose = require('mongoose')
const colors = require('colors')

const Product = require('./models/product')
const DB = 'farmStand';

mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
    .then(() => console.log(`-------connected to ${DB} database-------`.bgGreen))
    .catch(err => console.log(err))

Product.deleteMany({})
    .then(res => console.log(res))
    .catch(err => console.log(err))

Product.insertMany([
    { name: 'Apples', price: 0.10, onSale: true, qty: 50, category: 'fruit' },
    { name: 'Croissants', price: 2.99, onSale: true, qty: 40, category: 'pastry' },
    { name: 'Bananas', price: 0.10, onSale: true, qty: 100, category: 'fruit' },
    { name: 'Tomatoes', price: 0.30, onSale: true, qty: 151, category: 'fruit' },
    { name: 'Grapes', price: 0.99, onSale: true, qty: 70, category: 'fruit' },
    { name: 'Onions', price: 0.09, onSale: true, qty: 80, category: 'vegetable' },
    { name: 'Baklava', price: 2.99, onSale: true, qty: 40, category: 'pastry' },
])
    .then(res => console.log(res))
    .catch(err => console.log(err))
