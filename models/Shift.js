const mongoose = require('mongoose');

const ShiftSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization'
    },
    user: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    rest: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('shift', ShiftSchema);