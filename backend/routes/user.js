var express = require('express');
var router = express.Router();

/* POST /user/create */
router.post('/create', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* DELETE /user/delete */
router.delete('/delete', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /user/:id */
router.get('/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /user/settings */
router.get('/settings', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST /user/settings */
router.post('/settings', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
