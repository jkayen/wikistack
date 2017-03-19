var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;
module.exports = router;

router.get('/', function (req, res, next) {
  Page.findAll({})
    .then(function (thePages) {
      res.render('index', {
        pages: thePages
      })
    })
    .catch(next);
});

router.post('/', function (req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.authorName,
      email: req.body.authorEmail
    }
  })
  .spread(function (user, wasCreatedBool) {
    return Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      tags: req.body.tags
    }).then(function (createdPage) {
      return createdPage.setAuthor(user);
    });
  })
  .then(function (createdPage) {
    res.redirect(createdPage.route);
  })
  .catch(next);
});

router.get('/add', function (req, res) {
  res.render('addpage');
});

router.get('/search/:tag', function (req, res, next) {
  Page.findByTag(req.params.tag)
    .then(function (pages) {
      res.render('index', {
        pages: pages
      })
    })
    .catch(next);
})

router.get('/:urlTitle', function (req, res, next) {
  var urlTitleOfAPage = req.params.urlTitle;
  Page.findOne({
    where: {
      urlTitle: urlTitleOfAPage
    }
  })
    .then(function (page) {
      if (page === null) {
        return next(new Error('That page was not found!'));
      }
      return page.getAuthor()
        .then(function (author) {
          page.author = author;
          res.render('wikipage', {
            page: page
        });
      });
    })
    .catch(next);
});

router.get('/:urlTitle/similar', function (req, res, next) {
  var urlTitleOfAPage = req.params.urlTitle;
  Page.findOne({
    where: {
      urlTitle: urlTitleOfAPage
    }
  })
    .then(function (page) {
      if (page === null) {
        return next(new Error('That page was not found!'));
      }
      return page.findSimilar();
    })
    .then(function (similarPages) {
      res.render('index', {
        pages: similarPages
      });
    })
    .catch(next);
});
