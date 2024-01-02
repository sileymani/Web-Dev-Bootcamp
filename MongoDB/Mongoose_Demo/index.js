// try {

// } catch (e) {
//     console.log(e)
// }

main()
    .then(() => { console.log('Connected to DB') })
    .catch(err => console.log(err));

async function main() {
    const mongoose = require('mongoose');
    await mongoose.connect('mongodb://127.0.0.1:27017/movieApp');
}

const kittySchema = mongoose.Schema({
    name: String,
    age: Number
})

const kitten = mongoose.model('kitten', kittySchema)



