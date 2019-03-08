var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
// const helper = require('../helper/helper');
const models = require('../models');

/* GET users listing. */
router.get('/register', (req, res) => {
  res.render('pages/register')
})


router.post('/register', (req, res) => {
  // console.log(req.body)
  let users = req.body

  const saltRounds = 10;
  let salt = bcrypt.genSaltSync(saltRounds);
  let passwordEncrypt = bcrypt.hashSync(users.password, salt);

  models.User.create({
    username: users.username,
    email: users.email,
    password: passwordEncrypt,
    role: 'customer'
  }).then(users => {
    console.log('Data user baru berhasil disimpan')
    // login     
    res.redirect('/users/login')
    // console.log('=================')
  }).catch(err => {
    console.log(err)
    res.redirect('/users/register')
  })
})


router.get('/login', (req, res) => {
  res.render('pages/login')
});

router.post('/login', (req, res) => {

  let {
    username,
    email,
    password
  } = req.body
  models.User.findOne({
    where: {
      username: username
    }
  }).then(items => {
    if (items != null) {
      const checkPassword = bcrypt.compareSync(password, items.password)
      if (checkPassword === true) {
        req.session.user = {
          id: items.id,
          email: items.email,
          role: items.role
        }
        // console.log(req.session)
        res.redirect('/pages/home') //home
      } else {
        res.redirect('/pages/login')
      }
    }
  }).catch(err => {
    console.log(err)
    res.redirect('/pages/login')
  })
})

//versi 2
// router.post('/login', (req, res) => {
//   let body = req.body
//   models.User.findOne({
//     where: {
//       email: body.email
//     }
//   }).then(items => {
//     if (!items) {
//       throw new Error('wrong email!')
//     } else {
//       if (body.password === items.password) {
//         // let check = Helper.check(body.password, items.password)
//         // if (check === true) {
//         req.session.user = {
//           id: items.id,
//           email: items.email,
//           role: items.role
//         }
//         res.redirect('/items') //home
//       } else {
//         res.redirect('/home?into=wrong password')
//       }
//     }
//   }).catch(err => {
//     console.log(err)
//     res.redirect('/pages/login')
//   })
// })


router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/users/login')
    }
  })
})



module.exports = router;