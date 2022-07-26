const router = require('express').Router();
const sequelize = require('../../config/connection');
const { PostRecord, Record, User, Genre } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    PostRecord.findAll({
        attributes: [
            'id',
            'name',
            'band_name',
            'album_name',
        ]
    })
})
