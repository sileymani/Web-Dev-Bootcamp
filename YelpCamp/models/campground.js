const mongoose = require('mongoose')

const campgroundSchema = mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    image: {
        type: String,
    },
})

module.exports = mongoose.model('Campground', campgroundSchema)