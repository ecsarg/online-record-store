const router = require('express').Router();
const sequelize = require('../../config/connection');
const { PostRecord, Interest, User } = require('../../models');
const withAuth = require('../../utils/auth');
// const { post } = require('../home-routes');

// get all users posts to sell
router.get('/', (req, res) => {
    PostRecord.findAll({
        attributes: [
            'id',
            'title',
            'img_url',
            'band_name',
            'album_name',
            'genre_id',
            'price',
            'stock',
            'created_at'
        ],
        include: [
            {
                model: Interest,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get users one post by id
router.get('/:id', (req, res) => {
    PostRecord.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'img_url',
            'band_name',
            'album_name',
            'genre_id',
            'price',
            'stock',
            'created_at'
        ],
        include: [
            {
                model: Interest,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// to post user must have login credentials
router.post('/', withAuth, (req, res) => {
    PostRecord.create({
        title: req.body.title,
        img_url: req.body.img_url,
        band_name: req.body.band_name,
        album_name: req.body.album_name,
        genre_id: req.body.genre_id,
        price: req.body.price,
        stock: req.body.stock,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// to update a post user must have login credentials
router.put('/:id', withAuth, (req, res) => {
    PostRecord.update(
        {
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock
        },
        {
        where: {
            id: req.params.id
            }
         }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No posted record found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// to delete post user must have login credentials
router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    PostRecord.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No posted record found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;