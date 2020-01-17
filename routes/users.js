const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');

const User = require('../models/User');

// @route   GET api/users
// @desc    Get all  users
// @access  Private
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users
// @desc    Register a user
// @access  Public

router.post(
    '/',
    [
        check('name', 'Please add name')
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            name,
            email,
            password
        } = req.body;

        try {
            let user = await User.findOne({
                email
            });

            if (user) {
                return res.status(400).json({
                    msg: 'User already exists'
                });
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'), {
                    expiresIn: 36000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   PUT api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', async (req, res) => {
    const {
        organizationId,
        organizationName,
        email,
        password
    } = req.body;

    try {
        let user = await User.findById(req.params.id);
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);

            newPassword = await bcrypt.hash(password, salt);
        }


        // Build user object
        const userFields = {};
        if (organizationId) userFields.organizationId = organizationId;
        if (organizationName) userFields.organizationName = organizationName;
        if (email) userFields.email = email;
        if (password) userFields.password = newPassword;


        user = await User.findByIdAndUpdate(
            req.params.id, {
                $set: userFields
            }, {
                new: true
            }
        );



        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;