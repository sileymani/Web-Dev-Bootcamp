// METHODS, STATICS, VIRTUALS & MIDDLEWARES

const mongoose = require('mongoose');

main()
    .then(() => { console.log('Connected to DB') })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/personApp');
}

const personSchema = mongoose.Schema({
    first: String,
    last: String
})

//Methods
personSchema.methods.greet = function () {
    console.log(`Hello ! I'm ${this.first}`)
}

//Statics
personSchema.statics.chorale = function () {
    console.log(`WELCOME !!`)
}

//Virtuals
personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})

//MIDDLEWARES
personSchema.pre('save', async function () {
    console.log('ABOUT TO SAVE')
})

personSchema.post('save', async function () {
    console.log('JUST SAVED')
})


const Person = mongoose.model('Person', personSchema)

// const person = new Person({ first: 'Emy', last: 'Nomad' })
// person.save()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

person.greet()
Person.chorale()
console.log(person.fullName)