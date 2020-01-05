const mongoose = require('mongoose');

const ShiftSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization'
    },
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    break: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('shift', ShiftSchema);