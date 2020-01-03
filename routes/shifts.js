const express = require('express');
const router = express.Router();

// @route   GET api/shifts
// @desc    Get all shifts
// @access  Private
router.get('/', (req, res) => {
    res.send('Get all shifts');
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