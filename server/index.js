const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const {getUser, getPosts} = require('./controller');

const app = express();
app.use(json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


massive(process.env.CONNECTION_STRING).then(db => app.set('db', db)).catch(err => console.log(err));

app.use(express.static('public'));

app.get('/user', getUser)
app.get('/posts', getPosts)


const port = 3005;
app.listen( port, () => console.log(`Server listening on port ${port}!`));