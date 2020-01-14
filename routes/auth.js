const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authUser = require('../middleware/authUser');
const {
    check,
    validationResult
} = require('express-validator');

const User = require('../models/User');

// @route   GET api/users
// @desc    Get logged in user
// @access  Private

router.get('/', authUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   POST api/users
// @desc    Auth user & get token
// @access  Public

router.post('/', [check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                msg: 'Invalid Credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                msg: 'Invalid Credentials'
            })
        }

        const payload = {
            user: {
                id: user.id,
                name: user.name
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
            if (err) throw err;
            res.json({
                token
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;