var express = require('express');
var router = express.Router();
const models = require('../models');
const {
  checkAuth
} = require('../middlewares/auth')

/* GET home page. */
router.get('/', checkAuth, function (req, res, next) {
  const user = req.session.user
  res.render('index', {
    title: 'apliz',
    user: user
  });
});

//halaman awal
router.get('/home', (req, res) => {
  res.render('pages/home', {
    status: true //agar halaman storenya muncul
  })
})


module.exports = router;