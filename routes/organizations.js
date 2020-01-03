const express = require('express');
const router = express.Router();

// @route   GET api/organizations
// @desc    Get all users organizations
// @access  Private
router.get('/', (req, res) => {
    res.send('Get all organizations');
});

// @route   POST api/organizations
// @desc    Add new organization
// @access  Private
router.post('/', (req, res) => {
    res.send('Add organization');
});

// @route   PUT api/organizations/:id
// @desc    Update organization
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update organization');
});

// @route   DELETE api/organizations/:id
// @desc    Delete organization
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete organization');
});
module.exports = router;