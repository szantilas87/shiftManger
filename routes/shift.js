const express = require('express');
const router = express.Router();
const authOrganization = require('../middleware/authOrganization');
const authUser = require('../middleware/authUser');
const {
    check,
    validationResult
} = require('express-validator');


const Shift = require('../models/Shift');

// @route   GET api/shift
// @desc    Get shifts for user 
// @access  Public

router.post('/', async (req, res) => {

    try {
        const shift = await Shift.find({
            organization: req.body.organizationId,
            // organization: req.organization.id

        }).sort({
            startDate: -1
        });
        res.json(shift);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;