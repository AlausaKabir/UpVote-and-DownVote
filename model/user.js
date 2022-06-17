const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User must have an email'],
        unique: true,
        min: 6,
        max: 225
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    firstName: {
        type: String,
        required: [true, 'User must have a First Name']
    },
    lastName: {
        type: String,
        required: [true, 'User must have a First Name']
    },
    notification: {
        type: Array
    },
    score: {
        type: Number
    },
    time: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.comparePassword = function(password) {
    const user = bcrypt.compareSync(password, this.password);
    return user ? this : null;
};

userSchema.pre('save', function(next) {

    if (!this.confirmed) {
        const hashPassword = bcrypt.hashSync(this.password, 10);
        this.password = hashPassword;
    }
    next();
});


module.exports = mongoose.model('User', userSchema);
 