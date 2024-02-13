const mongoose = require('mongoose')
const axios = require('axios');
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
        let imgURL = await axios.get('https://api.unsplash.com/photos/random/?client_id=BQBfLmdRVny4EE_C2thAbgRbU0VnAVbWy1sdThgwbr0&collections=1319040')

        console.log(imgURL.data)
        const randCity = sample(cities)
        const camp = new Campground({
            location: `${randCity.city}, ${randCity.state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: imgURL.data.urls.small,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi accusamus iusto unde voluptatem totam perspiciatis id, quam in mollitia, dolores corporis dolorum consequuntur nulla inventore vel laborum molestiae suscipit voluptas.',
            price: (Math.random() * 10).toFixed(2),
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
    console.log(`----disconnected from ${DB} database-----`.bgRed)
})