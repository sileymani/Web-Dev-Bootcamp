const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    onSale: {
        type: Boolean,
        default: false
    },
    qty: {
        type: Number,
        min: 0,
        default: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy', 'pastry', 'juice']
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product