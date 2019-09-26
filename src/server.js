const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const hbs = require('hbs');
require('./db/mongoose');
const userRouter = require('./router/user');

const app = express();
const port = process.env.PORT || 8080;

//Define path for Express config
const publiceDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//public directory
app.use(express.static(publiceDirectoryPath));

app.use(express.json());

//actual routes for Query Handler
app.use(userRouter);

app.listen(port, () => {
    console.log('Server is running at port ' + port);
});