const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allDataSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2023
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    accountId: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('AllData', allDataSchema);