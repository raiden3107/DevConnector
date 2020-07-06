const express = require('express')
const {
    check,
    validationResult
} = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {
    findOne
} = require('../../models/User')
const auth = require('../../middleware/auth')

const router = express.Router()

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        res.status(500).send('Server error')
    }
})

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please include a password').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        })
    }
    const {
        email,
        password
    } = req.body
    try {
        let user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(400).json({
                error: [{
                    'msg': 'Invalid credentials'
                }]
            })
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).json({
                error: [{
                    'msg': 'Invalid credentials'
                }]
            })
        }
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