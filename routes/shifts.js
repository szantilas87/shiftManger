const express = require('express');
const router = express.Router();
const authOrganization = require('../middleware/authOrganization');
const {
    check,
    validationResult
} = require('express-validator');

const Shift = require('../models/Shift');
const Organization = require('../models/Organization');


// @route   GET api/shifts
// @desc    Get all shifts
// @access  Private
router.get('/', authOrganization, async (req, res) => {
    try {
        const shifts = await Shift.find({
            organization: req.organization.id
        }).sort({
            date: -1
        });
        res.json(shifts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/shifts
// @desc    Add new shift
// @access  Private
router.post('/', [authOrganization, [check('name', 'Name is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        name,
        start,
        end,
        rest
    } = req.body;

    try {
        const newShift = new Shift({
            name,
            start,
            end,
            rest,
            organization: req.organization.id
        });

        const shift = await newShift.save();
        res.json(shift);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/shifts/:id
// @desc    Update shift
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update shift');
});

// @route   DELETE api/shifts/:id
// @desc    Delete shift
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete shift');
});
module.exports = router;