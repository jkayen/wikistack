var express = require('express');
var swig = require('swig');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var models = require('./models');
var Page = models.Page;
var User = models.User;

var app = express();
var wikiRouter = require('./routes/wiki');

app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.use('/wiki', wikiRouter); //allows routes to refer to '/' instead of 'wiki'.

app.get('/', function (req, res) {
  res.render('index');
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send(err.message);
});

User.sync()
  .then(function () {
    return Page.sync();
  })
  .then(function () {
    app.listen(3001, function() {
      console.log('Server is listening on port 3001!');
    });
  });


