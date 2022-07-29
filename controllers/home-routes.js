const router = require('express').Router();
const { PostRecord, Record, User } = require('../models');

// get all post for homepage
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
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get single posting
router.get('/post/:id', (req, res) => {
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

        const post = dbPostData.get({ plain: true });

        res.render('single-post', {
            post, loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;