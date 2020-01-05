const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('organization', OrganizationSchema);