var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
module.exports = router;

router.get('/', function () {

});

router.post('/', function (req, res, next) {
  var newPage = Page.build(req.body);
  newPage.save()
    .then(function () {
      res.redirect('/wiki');
    })
    .catch(next);
});

router.get('/add', function (req, res) {
  res.render('addpage');
});
