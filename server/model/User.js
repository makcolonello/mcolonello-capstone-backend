const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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

    balance: {
        type: Number,
        default: 25,
        required: true
    },
 
    refreshToken: [String]
});



module.exports = mongoose.model('User', userSchema);