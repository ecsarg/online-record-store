const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require("multer");
const upload = require("../../public/javascript/image-upload");
const { response } = require("express");
var methodOverride = require("method-override");

router.use(methodOverride("_method"));


// Get all posts
router.get("/", (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'title',
                'img_url',
                'band_name',
                'album_name',
                'genre',
                'price',
                'stock',
                'created_at'
            ],
            order: [
                ["created_at", "DESC"]
            ],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single post
router.get("/:id", (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: [
                'id',
                'title',
                'img_url',
                'band_name',
                'album_name',
                'genre',
                'price',
                'stock',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a post

// router.post("/", upload.single("image"), withAuth, (req, res) => {
router.post("/", withAuth, (req, res) => {
    console.log("creating");
    Post.create({
            title: req.body.title,
            img_url: req.body.img_url, // req.file.location,
            band_name: req.body.band_name,
            album_name: req.body.album_name,
            genre: req.body.genre,
            price: req.body.price,
            stock: req.body.stock,
            user_id: req.session.user_id
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update a post

// router.put("/:id", upload.single("image"), withAuth, (req, res) => {

router.put("/:id", withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            img_url: req.body.img_url, // req.file.location
            band_name: req.body.band_name,
            album_name: req.body.album_name,
            genre: req.body.genre,
            price: req.body.price,
            stock: req.body.stock,
            user_id: req.session.user_id
        }, 
        {
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete a post
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;