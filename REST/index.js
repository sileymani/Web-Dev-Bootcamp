const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const colors = require('colors');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'Hello there, im new here'
    },
    {
        id: uuid(),
        username: 'Marie',
        comment: 'Going to new york tmrrw ! Cant wait'
    },
    {
        id: uuid(),
        username: 'Jamal',
        comment: 'Feeling quite exstatic today, im having my first son !'
    },
    {
        id: uuid(),
        username: 'Inil',
        comment: 'Life is darkness, and only darkness shall prevail'
    }
]

// Index
app.get('/comments', (req, res) => {
    console.log("-------------------------------------------------------------")
    console.log("GET /comments request\nIndex".magenta);
    res.render('comments/index.ejs', { comments: comments })
})

// New
app.get('/comments/new', (req, res) => {
    console.log("-------------------------------------------------------------")
    console.log("GET /comments/new request\nNew".magenta);
    res.render('comments/new')
})

// Create
app.post('/comments', (req, res) => {
    console.log("-------------------------------------------------------------")
    console.log("POST /comments request\nCreate".magenta)
    const { username, comment } = req.body
    if (comment && username) {
        comments.push({ id: uuid(), username, comment })
        console.log("Comment added ! Redirection to index".green);
        res.redirect('/comments')
    } else {
        console.log("No username or comment sent.. Redirect to index".red);
        res.redirect("/comments")
    }
    // newComment ? res.send('New comment added') : res.send('Please specify a new comment')
})

// Show
app.get('/comments/:id', (req, res) => {
    console.log("-------------------------------------------------------------")
    let { id } = req.params;
    console.log(`GET /comments/${id} resquest\nShow`.magenta);
    // Both following lines work, one requires return and the other the return is implicit
    // Because there's no brackets
    const comment = comments.find((c) => { return c.id === id })
    // const comment = comments.find(c => c.id === id)
    if (comment) {
        console.log("Comment found ! Redirect to show".green);
        res.render('comments/show.ejs', { comment });
    } else {
        console.log("No comment found.. Redirect to index".red);
        res.redirect("/comments")
    }
})

// Edit
app.get('/comments/:id/edit', (req, res) => {
    console.log("-------------------------------------------------------------")
    const { id } = req.params;
    console.log(`GET /comments/${id} request\nEdit`.magenta);
    res.render('comments/edit.ejs', { comment: comments.find(c => c.id === id) });
})

// Update
app.patch('/comments/:id', (req, res) => {
    console.log("-------------------------------------------------------------")
    const { id } = req.params;
    const { comment } = req.body;// Here comment is not the object but just the comment got from the req body
    console.log(`PATCH /comments/${id} request\nUpdate`.magenta)
    if (comment) {
        const commentToUpdate = comments.find(c => c.id === id)
        commentToUpdate.comment = comment;
        console.log("Comment updated ! Redirect to index".green);
        res.redirect(`/comments/${id}`)
    } else {
        console.log("No comment sent.. Redirect to index".red);
        res.redirect("/comments")
    }
})

// Destroy
app.delete('/comments/:id', (req, res) => {
    console.log("-------------------------------------------------------------")
    let { id } = req.params
    console.log(`DELETE /comment/${id} request\nDestroy`.magenta)
    const comment = comments.find(c => c.id === id)
    if (comment) {
        const commentIndex = comments.indexOf(comment);
        console.log("Comment deleted ! Redirect to index".green);
        comments.splice(commentIndex, 1)
        res.redirect('/comments')
    } else {
        console.log("No comment found.. Redirect to index".red);
        res.redirect("/comments")
    }
})

app.listen(4000, () => {
    console.log('---------------listening on 4000---------------'.blue)
})