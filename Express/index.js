const express = require('express');
const app = express();

// console.dir(app);
// app.use((req, res) => {
//     console.log('new request');
//     // res.send('We got your request you bitch');
//     // res.send({ name: 'blublubleurgh!' });
// })

app.get('/cats', (req, res) => {
    res.send('<h1>Suck miaou dick or somemiaou</h1>');
})

app.get('/r/:subreddit', (req, res) => {
    // console.log(req.params);
    const { subreddit } = req.params;
    res.send(`<h1>${subreddit}</h1><p>This is the ${subreddit} subreddit !</p>`);
})

app.get('/r/:subreddit/:postid', (req, res) => {
    // console.log(req.params);
    const { subreddit, postid } = req.params;
    res.send(`<h1>${subreddit}</h1><p>This is the ${subreddit} subreddit !</p><p>This is the post ${postid}`);
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) { res.send('Nothing found if nothing searched') }
    res.send(`<h1>Search results for ${q}</h1>`);
})


app.get('/dogs', (req, res) => {
    res.send('<h1>Suck a woof dick or somewoof</h1>');
})

app.get('/', (req, res) => {
    res.send('<h1>Welcome bitch</h1>')
})

app.listen(4000, () => {
    console.log('------------listening on 4000--------------');
})