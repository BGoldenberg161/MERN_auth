require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const passport = require('passport')
const JWT_SECRET = process.env.JWT_SECRET

const User = require('../../models/User')

//(public) test route
router.get('/test', (req, res) => {
    res.json({msg: 'User endpoint 👌'})
})

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(user) {
            return res.status(400).json({ message: 'Email already exists!'})
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                    .then(newUser => res.json(newUser))
                    .catch(err => console.log(err))
                })
            })
        }
    })
})

module.exports = router