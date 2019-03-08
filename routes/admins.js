const express = require('express')
const router = express.Router();
// const helper = require('../helper/helper');
const models = require('../models');
const {
    checkAuth
} = require('../middlewares/auth');


router.get('/', checkAuth, (req, res) => {
    models.Item.findAll().then(items => {
        res.render('pages/admin', {
            items: items
        })
    }).catch(err => {
        console.log(err)
        res.redirect('/pages/admin')
    })
})

router.get('/items/edit/:id', checkAuth, (req, res) => {
    let itemId = req.params.id
    models.Item.findOne({
        where: {
            id: itemId
        }
    }).then(items => {
        res.render('pages/edititem', {
            id: itemId,
            items: items
        })
    }).catch(err => {
        console.log(err)
        res.redirect('/pages/admin')
    })
})

router.post('/items/edit/:id', (req, res) => {
    let itemId = req.params.id
    let {
        item,
        price
    } = req.body

    models.Item.findOne({
        where: {
            id: itemId
        }
    }).then(items => {
        return items.update({
            item,
            price
        })
    }).then(updateItems => {
        res.redirect('/items')
    }).catch(err => {
        console.log(err)
        res.redirect('/items')
    })
})

router.get('/items/delete/:id', checkAuth, (req, res) => {
    let itemId = req.params.id
    models.Item.destroy({
        where: {
            id: itemId
        }
    }).then(items => {
        let info = 'success delete item'
        res.redirect('/admins')
    }).catch(err => {
        res.redirect('/admins')
    })
})


router.get('/items/additemGet', checkAuth, (req, res) => {
    res.render('pages/additem')
})

router.post('/items/additemPost', (req, res) => {
    let body = req.body
    models.Item.create(body).then(items => {
        let info = 'succes add item'
        res.redirect('/items')
    }).catch(err => {
        console.log(err)
        res.redirect('/items')
    })
})



module.exports = router;