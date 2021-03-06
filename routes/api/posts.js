const express = require('express')
const {
    check,
    validationResult
} = require('express-validator')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Post = require('../../models/Post')

const router = express.Router()

router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(401).json({
            error: errors.array()
        })
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save()
        res.json(post)
    } catch (error) {
        res.status(500).send('Server error')
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({
            date: -1
        })
        res.json(posts)
    } catch (error) {
        res.status(500).send("Server error")
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).send("Post not found")
        }
        res.json(post)
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send("Post not found")
        }
        res.status(500).send("Server error")
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).send("Post not found")
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(400).json({
                msg: 'User not authorized'
            })
        }
        await post.remove()
        res.json({
            msg: "Post removed"
        })
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send("Post not found")
        }
        res.status(500).send("Server error")
    }
})

router.post('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
                msg: 'Post already been liked.'
            })
        }
        post.likes.unshift({
            user: req.user.id
        })
        await post.save()
        res.json(post.likes)
    } catch (error) {
        res.status(500).send('Server error')
    }
})

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
                msg: 'Post has not been liked.'
            })
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json(post.likes)
    } catch (error) {
        res.status(500).send('Server error')
    }
})

router.post('/comment/:id', [auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(401).json({
            error: errors.array()
        })
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)
        const comment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        post.comments.unshift(comment)
        await post.save()
        res.json(post.comments)
    } catch (error) {
        res.status(500).send('Server error')
    }
})

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)
        if (!comment) {
            return res.status(404).json({
                msg: 'Comment does not exist'
            })
        }
        console.log(comment)
        if (comment.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                msg: 'User not authoriezed!!!'
            })
        }
        const removeIndex = post.comments.map(comment => comment.id.toString()).indexOf(comment.id)
        post.comments.splice(removeIndex, 1)
        await post.save()
        res.json(post.comments)
    } catch (error) {
        res.status(500).send('Server error')
    }
})

module.exports = router