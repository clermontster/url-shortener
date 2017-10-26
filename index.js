const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
// const url = 'mongodb://localhost:27017/url-shortener';	
const url = 'mongodb://<dbuser>:<dbpassword>@ds235775.mlab.com:35775/url-shortener';

const indexRoute = require('./routes/indexRoute');
const newRoute = require('./routes/newRoute');


app.use('/', indexRoute);
app.use('/new', newRoute);
app.listen(port, () => console.log(`Listening on port ${port}`));