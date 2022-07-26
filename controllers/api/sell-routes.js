const router = require('express').Router();
const sequelize = require('../../config/connection');
const { PostRecord, Record, User, Genre } = require('../../models');
const withAuth = require('../../utils/auth');
const { post } = require('../home-routes');

// get all users posts to sell
router.get('/', (req, res) => {

});

// get users one post by id
router.get('/:id', (req, res) => {

});

// to post user must have login credentials
router.post('/', withAuth, (req, res) => {

});

// to update a post user must have login credentials
router.put('/:id', withAuth, (req, res) => {

});

// to delete post user must have login credentials
router.delete('/:id', withAuth, (req, res) => {
    
});

module.exports = router;