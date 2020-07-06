const express = require('express')
const {
    check,
    validationResult
} = require('express-validator')
const gravatar = require('gravatar')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {
    findOne
} = require('../../models/User')

const router = express.Router()

router.post('/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please include a password of minimum 6 characters').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        })
    }
    const {
        name,
        email,
        password
    } = req.body
    try {
        let user = await User.findOne({
            email
        })
        if (user) {
            return res.status(400).json({
                error: [{
                    'msg': 'User already exists'
                }]
            })
        }
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        user = new User({
            name,
            email,
            password,
            avatar
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) {
                throw err
            }
            res.json({
                token
            })
        })
    } catch (error) {
        res.status(500).send('Server error')
    }
})

module.exports = router