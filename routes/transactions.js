const express = require('express');
const router = express.Router();
const models = require("../models");
const { checkAuth } = require('../middlewares/auth');

router.get('/', checkAuth, (req, res) => {
    // models.Transaction.findAll().then(items => {
    //     res.render('pages/listtransaction', {
    //         items: items
    //     })
    // }).catch(err => {
    //     console.log(err)
    //     res.redirect('/transactions')
    // })

    models.User.findAll({
        include: [{
            model: models.Item
        }]
    })
        .then(items => {
            res.render('pages/listtransaction', { items })
        })
        .catch(err => {
            res.redirect(`/transactions?info=${err}`)
        })

})


router.get('/buyItem/:id', checkAuth, (req, res) => {
    // console.log(req.session.user)

    let itemId = req.params.id
    let userId = req.session.user.id
    let obj = {
        ItemId: itemId,
        UserId: userId
    }

    models.Transaction.create(obj)
        .then(items1 => {
            return models.Item.findOne({ where: { id: itemId } })
                .then(items2 => {
                    res.redirect(`/transactions`)
                }).catch(err => {
                    res.redirect(`/items?info=${err}`)
                })
        })
})

//     models.Transaction.create(obj).then(items => {
//         res.render('pages/listtransaction', { items: items })
//     }).then(data => {
//         console.log('berhasil menambahkan data')
//         res.redirect('/transactions')
//     }).catch(err => {
//         console.log(err)
//         res.redirect('/listtransactions')
//     })
// })

router.get('/showTransactiongGet', (req, res) => {
    res.render('pages/listtransaction')
})

router.post('/showTransactionPost', (req, res) => {
    // let body = req.body
    models.Transaction.findAll().then(items => {
        res.render('listtransaction')
    }).catch(err => {
        console.log(err)
        res.redirect('/listtransaction')
    })
})


router.post('/list', (req, res) => {
    models.Item.findAll({
        include: [{
            models: models.Item
        }]
    }).then(items => {
        res.render('pages/listtransaction', {
            items: items
        })
    }).catch(err => {
        console.log(err)
        res.redirect('/pages/listitem')
    })
})



module.exports = router