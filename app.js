var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var path = require('path');
var bodyParser = require('body-parser');
var models = require('./models');

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


// MIDDLEWARES
app.use(express.static(path.join(__dirname, '/public')));

app.use('/wiki', require('./routes/wiki.js'))

// error handling middleware
app.use(function (err, req, res, next) {
   console.log(err);
});



//MODEL SYNC
models.User.sync({force: true})
.then(function () {
    return models.Page.sync({force: true})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);




