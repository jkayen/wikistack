var express = require('express')
var router = express.Router()
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
	// retrieve all wiki pages
	Page.findAll()
	.then(function(pages) {
		res.render('index', {pages: pages});
	})
});

router.post('/', function(req, res, next){
	//submit a new page to the database
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
	User.findOrCreate({
		where: {
			name: req.body.authorName,
			email: req.body.authorEmail
		}
	}).then(function (values) {
		// console.log(values);
		console.log('two');
		var user = values[0];
		var page = Page.build({
    	title: req.body.pageTitle,
    	content: req.body.pageContent,
			status: req.body.pageStatus
  	});
		return page.save().then(function (page) {
			return page.setAuthor(user);
		});
	}).then(function (page) {
		console.log('three');
		res.redirect(page.route)
	})
	.catch(next);
});

router.get('/add', function(req, res, next){
	//retrieve the "add a page form"
	res.render('addpage')
});

router.get('/:urlTitle', function(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.render('wikipage', {foundPage: foundPage});
  })
  .catch(next);
});


router.get('/users/', function(req, res, next){
	//get all users, do not change db
});

router.get('/users/:id', function(req, res, next){
	//get user, do not change db
});

router.post('/users', function(req, res, next) {
	// create a user in the db
});

router.put('/users/:id', function(req, res, next) {
	//update user 123 in the db
});

router.delete('/users/:id', function(req, res, next) {
	//delete user from the db
});

module.exports = router
