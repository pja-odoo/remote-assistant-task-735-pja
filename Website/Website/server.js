const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    contactInfo: String,
    preferences: String,
    serviceHistory: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/register', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(user => res.redirect('/login.html'))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password })
        .then(user => {
            if (user) {
                res.redirect(`/profile.html?username=${user.username}`);
            } else {
                res.redirect('/login.html');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/profile', (req, res) => {
    const username = req.query.username;
    User.findOne({ username })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
