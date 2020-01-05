const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');

const Shift = require('../models/Shift');
const Organization = require('../models/Organization');


// @route   GET api/shifts
// @desc    Get all shifts
// @access  Private
router.get('/', async (req, res) => {
    try {
        const shifts = await Shift.find("5e0f6e51059e6a4a9cbabb7e").sort({
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
router.post('/', (req, res) => {
    res.send('Add shift');
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