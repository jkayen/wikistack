var express = require('express')
var router = express.Router() 

router.get('/', function(req, res, next){
	// retrieve all wiki pages
	res.redirect('/')

})

router.post('/', function(req, res, next){
	//submit a new page to the database
})

router.get('/add', function(req, res, next){
	//retrieve the "add a page form"
	res.render('addpage')
})

module.exports = router
