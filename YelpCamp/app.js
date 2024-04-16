const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const colors = require('colors')
const mongoose = require('mongoose')
const Joi = require('joi')
const morgan = require('morgan')
const engine = require('ejs-mate')
const Campground = require('./models/campground')
const wrapper = require('./utils/asyncWrapper')
const expressError = require('./utils/ExpressError')
const { campgroundSchema } = require('./utils/validationSchemas')

const app = express()

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400)
    } else {
        next()
    }
}

app.get('/', (req, res) => {
    console.log(`GET / request\n`.magenta)
    res.send('All good !')
})

//Index
app.get('/campgrounds', wrapper(async (req, res) => {
    // console.log(`GET /campgrounds request\nIndex\n`.magenta)
    const campgrounds = await Campground.find({})
    res.render('./campgrounds/index.ejs', { campgrounds })
}))

//New
app.get('/campgrounds/new', wrapper(async (req, res) => {
    // console.log(`GET /campgrounds/new request\nNew\n`.magenta)
    res.render('./campgrounds/new')
}))

//Show
app.get('/campgrounds/:id', wrapper(async (req, res) => {
    const { id } = req.params;
    // console.log(`GET /campgrounds/${id} request\nShow\n`.magenta)
    const campground = await Campground.findById(id)
    res.render('./campgrounds/show.ejs', { campground })
}))

//Create
app.post('/campgrounds', validateCampground, wrapper(async (req, res) => {
    // console.log(`POST /campgrounds request\nCreate\n`.magenta)
    const { title, location, price, image, description } = req.body
    const campground = new Campground({ title, location, price, description, image })
    const newCamp = await campground.save()
    console.log(newCamp)
    res.redirect('/campgrounds')
}))

//Edit
app.get('/campgrounds/:id/edit', validateCampground, wrapper(async (req, res) => {
    let { id } = req.params;
    // console.log(`GET /campgorunds/${id}/edit request\nEdit\n`.magenta)
    let campground = await Campground.findById(id)
    res.render('./campgrounds/edit.ejs', { campground });
}))

//Update
app.put('/campgrounds/:id', wrapper(async (req, res) => {
    let { id } = req.params;
    // console.log(`PUT /campgrounds/${id} request\nUpdate\n`.magenta)
    let { title, location } = req.body

    const campground = await Campground.findById(id);

    campground.title = title
    campground.location = location

    await campground.save()

    res.redirect(`/campgrounds/${id}`)
}))

//Destroy
app.delete('/campgrounds/:id', wrapper(async (req, res) => {
    let { id } = req.params
    // console.log(`DELETE /campgrounds/${id} request\nDestroy\n`.magenta)
    await Campground.deleteOne({ _id: id })

    res.redirect('/campgrounds')
}))

//Not Found
app.all('*', (req, res, next) => {
    // console.log(`Not Found\n`.red)
    next(new expressError('Not Found', 404))
})

app.use((err, req, res, next) => {
    const { status = 500 } = err
    if (!err.message) err.message = 'Something went wrong !'
    // res.status(status).send(message)
    res.status(status).render('error', { err })
})

//Server & Database
app.listen(4000, () => {
    console.log('--------------listening on 4000--------------'.bgBlue)
})

const DB = 'yelpCamp';

mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
    .then((res) => console.log(`--------connected to ${DB} database-------`.bgGreen))
    .catch(err => console.log(err))