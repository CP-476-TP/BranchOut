var express = require('express');
var router = express.Router();

/* POST /project/create */
router.post('/create', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* DELETE /project/delete */
router.delete('/delete', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /project/:id */
router.get('/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /project/byUser */
router.get('/byUser', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /project/byPage */
router.get('/byPage', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
