const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const authOrganization = require('../middleware/authOrganization');
const {
    check,
    validationResult
} = require('express-validator');

const Organization = require('../models/Organization');

// @route   GET api/organization
// @desc    Get current organization
// @access  Private

router.get('/', authOrganization, async (req, res) => {
    try {
        const organization = await Organization.findById(req.organization.id);
        res.json(organization);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   POST api/organization
// @desc    Auth organization & get token
// @access  Public

router.post('/', [check('name', 'Please add name')
    .not()
    .isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        name
    } = req.body;
    try {
        let organization = await Organization.findOne({
            name
        });
        if (!organization) {
            return res.status(400).json({
                msg: 'Invalid Name'
            });
        }




        const payload = {
            organization: {
                id: organization.id,
                rate: organization.rate
            }
        };

        jwt.sign(payload, config.get('jwtSecret'),
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            });
    } catch (err) {
        console.log('aa')
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;