const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create User Schema & model
const RegisterSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    }
});

const Register = mongoose.model('register', RegisterSchema);

module.exports = Register;
// const mongoose = require('mongoose');

// const RegisterSchema = mongoose.Schema({
//    _id: mongoose.Schema.Types.ObjectId,
//    name: {type: String, required: true},
//    password: {type: String, required: true}
// });

// module.exports = mongoose.model('register', RegisterSchema);