const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Organization = require('../models/Organization');
const User = require('../models/User');

// @route   GET api/organizations
// @desc    Get all  organizations
// @access  Private
router.get('/', async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/organizations
// @desc    Add new organization
// @access  Private
router.post(
  '/',
  [
    check('name', 'Name is require')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, rate } = req.body;

    try {
      const newOrg = new Organization({
        name,
        rate
      });

      const organization = await newOrg.save();
      res.json(organization);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/organizations/:id
// @desc    Update organization
// @access  Private
router.put('/:id', async (req, res) => {
  const { name, rate } = req.body;

  // Build organization object
  const organizationFields = {};

  if (name) organizationFields.name = name;
  if (rate) organizationFields.rate = rate;

  try {
    let organization = await Organization.findById(req.params.id);

    if (!organization)
      return res.status(404).json({
        msg: 'Organization not found'
      });

    organization = await Organization.findByIdAndUpdate(
      req.params.id,
      {
        $set: organizationFields
      },
      {
        new: true
      }
    );
    res.json(organization);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/organizations/:id
// @desc    Delete organization
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    let organization = await Organization.findById(req.params.id);

    if (!organization)
      return res.status(404).json({
        msg: 'Contact not found'
      });

    await Organization.findByIdAndRemove(req.params.id);
    res.json({
      msg: 'Organization removed'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
