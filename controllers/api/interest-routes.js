const router = require('express').Router();
const sequelize = require('../../config/connection');
const { PostRecord, Interest, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Interest.findAll()
    .then(dbInterestData => res.json(dbInterestData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Interest.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(dbInterestData => res.json(dbInterestData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Interest.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbInterestData => {
        if (!dbInterestData) {
            res.status(404).json({ message: 'No interest found with this id.' });
            return;
        }
        res.json(dbInterestData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;