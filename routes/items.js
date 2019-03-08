const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    models.Item.findAll().then(items => {
        // console.log(items)
        res.render('pages/listitem', {
            items: items
        })
    }).catch(err => {
        console.log(err)
        res.redirect('/items')
    })
})



module.exports = router