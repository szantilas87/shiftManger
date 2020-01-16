const express = require('express');
const router = express.Router();
const authOrganization = require('../middleware/authOrganization');
const authUser = require('../middleware/authUser');
const {
    check,
    validationResult
} = require('express-validator');

const Shift = require('../models/Shift');

// @route   GET api/shifts
// @desc    Get all shifts
// @access  Private
router.get('/', authUser, async (req, res) => {

    try {
        const shifts = await Shift.find({
            organization: req.user.organizationId,
            // organization: req.organization.id

        }).sort({
            startDate: -1
        });
        res.json(shifts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/shifts
// @desc    Add new shift
// @access  Private
router.post('/', [authUser, authOrganization], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        startDate,
        startTime,
        endTime,
        rest
    } = req.body;

    try {
        const newShift = new Shift({
            startDate,
            startTime,
            endTime,
            rest,
            organization: req.organization.id,
            user: req.user.name,
            rate: req.organization.rate
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
router.put('/:id', async (req, res) => {
    const {
        startDate,
        startTime,
        endTime,
        rest
    } = req.body;

    // Build contact object
    const shiftFields = {};
    if (startDate) shiftFields.startDate = startDate;
    if (startTime) shiftFields.startTime = startTime;
    if (endTime) shiftFields.endTime = endTime;
    if (rest) shiftFields.rest = rest;

    try {
        let shift = await Shift.findById(req.params.id);

        if (!shift)
            return res.status(404).json({
                msg: 'Shift not found'
            });

        shift = await Shift.findByIdAndUpdate(
            req.params.id, {
                $set: shiftFields
            }, {
                new: true
            }
        );
        res.json(shift);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/shifts/:id
// @desc    Delete shift
// @access  Private
router.delete('/:id', authUser, authOrganization, async (req, res) => {
    try {
        let shift = await Shift.findById(req.params.id);

        if (!shift)
            return res.status(404).json({
                msg: 'Shift not found'
            });

        // Make sure user owns Shift
        if (shift.organization.toString() !== req.organization.id) {
            return res.status(401).json({
                msg: 'Not authorized'
            });
        }

        await Shift.findByIdAndRemove(req.params.id);

        res.json({
            msg: 'Shift removed'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;