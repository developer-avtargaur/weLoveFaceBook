const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
const users = require('./routes/users');
const posts = require('./routes/posts');
const port = 3000;

//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error'+ err);
});

//cors middleware
app.use(cors());

//Set static Folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));

//Body Parser Middleware
app.use(bodyParser.json({limit:'10mb'}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/posts', posts);

//Your initial state is to go to index.html
app.all("*",(req,res,next) => {
    res.sendFile(path.resolve('../frontend/dist/index.html'))
});

app.listen(port, () => {
    console.log('Server started on port '+ port);
});