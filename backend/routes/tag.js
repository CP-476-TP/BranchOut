var express = require('express');
var router = express.Router();

/* GET /tag/:id */
router.get('/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /tag/allTags */
router.get('/allTags', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
