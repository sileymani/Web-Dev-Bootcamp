const mongoose = require('mongoose')
const colors = require('colors')
const Campground = require('../models/campground')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')

const DB = 'yelpCamp';

mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
    .then(() => console.log(`-------connected to ${DB} database-------`.bgGreen))
    .catch(err => console.log(err))

const sample = arr => arr[Math.floor(Math.random() * arr.length)]

const seedDB = async () => {
    await Campground.deleteMany({})

    for (let i = 0; i < 50; i++) {
        const randCity = sample(cities)
        const camp = new Campground({
            location: `${randCity.city}, ${randCity.state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
    console.log(`----disconnected from ${DB} database-----`.bgRed)
})