const router = require('express').Router();
const sequelize = require('../config/connection');
const { PostRecord, Record, User, Genre } = require('../models');

// get all post for homepage
router.get('/', (req, res) => {
    
});

// get single posting
router.get('/post/:id', (req, res) => {

});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;