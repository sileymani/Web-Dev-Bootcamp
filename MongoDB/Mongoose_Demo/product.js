// SCHEMA CONSTRAINTS AND VALIDATIONS

const mongoose = require('mongoose');

main()
    .then(() => { console.log('Connected to DB') })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
        default: 'Non-categorized'
    },
    qty: {
        inStore: {
            type: Number,
            min: 0,
            default: 0
        },
        online: {
            type: Number,
            min: 0,
            default: 0
        }
    }
})

const Product = mongoose.model('Product', productSchema)

// const bike = new Product({
//     name: 'Outdoor Cam',
//     price: 43.99,
//     categories: ['Electronics', 'Security'],
//     onSale: true,
//     qty: {
//         inStore: 12
//     }
// })

// bike.save()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))