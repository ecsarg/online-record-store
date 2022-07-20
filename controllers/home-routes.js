const router = require('express').Router();
const sequelize = require('../config/connection');
const { ** add api routes here } = require('../models');

// get all post for homepage
router.get('/', (req, res) => {

});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;