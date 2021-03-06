const express = require("express");
const router = express.Router();

//User model
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route POST api/posts/new
// @desc  Create new Post
router.post("/new", (req, res) => {
    const newPost = new Post({
        username: req.body.username,
        message: req.body.message,
        date: Date.now()
    });
    newPost.save()
        .then(post => res.json({success: true, post}))
        .catch(err => res.json({success: false, error: err, message: "Saving a post failed"}));
});

// Used by GET api/posts/load:id
// if viewing a user's page, query string will be passed with a id paramater.
// If so, then give Post.find() method a filter 
const userFilter = (request) => {
    if (request.query.id) {
        console.log("id given "+decodeURIComponent(request.query.id));
        return({username: request.query.id});
    } else {
        console.log("no id given");
        return({});
    }
}
// @route GET api/posts/load/:id
// @desc  Get all posts
router.get("/load/", (req, res) => {
    Post.find(userFilter(req)).sort({date:-1})
        .then(posts => {
            res.json({success: true, message: "Posts loaded", posts});
        });
    }
);

// @route POST api/posts/delete
// @desc  Delete a post
router.post("/delete", (req, res) => {
    Post.deleteOne({
        username: req.body.username,
        message: req.body.message
    }, (err) => {
        if (err) {
            res.json({success: false, message: "Deletion failed"});
        } else {
            res.json({success: true, message: "Post deleted"});
        }
    })
})

module.exports = router;