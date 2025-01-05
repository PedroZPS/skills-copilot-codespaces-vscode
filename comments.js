// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Import comments
const comments = require('./comments');

// Import body-parser
const bodyParser = require('body-parser');

// Use body-parser
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
    const { body } = req;
    const { username, comment } = body;

    if (!username || !comment) {
        res.status(400).send('You need to provide a username and a comment');
    } else {
        const newComment = {
            username,
            comment,
            id: comments.length + 1,
            createdAt: new Date()
        };

        comments.push(newComment);
        res.json(newComment);
    }
});

// Start web server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});