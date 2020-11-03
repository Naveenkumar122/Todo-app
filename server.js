//importing required packages
require('rootpath')();
let express = require('express');
let bodyParser = require('body-parser');

//creating express app
let app = express();

// set the view engine to ejs
app.use(express.static(`${__dirname}/Pages`));
app.set('view engine','ejs');

//configuring bodyParser to express app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api routes
app.use('/todo', require('./users/controller'));

// start server
let port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
let server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});