const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data/data.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit.ejs', { subreddit: data });
    } else {
        res.send(`No subreddit named ${subreddit} was found`)
    }
})


app.get('/random', (req, res) => {
    const n = Math.floor(Math.random() * 10 + 1)
    res.render('random.ejs', { rand: n });
})

app.listen(4000, () => {
    console.log('--------------listening on 4000--------------')
})