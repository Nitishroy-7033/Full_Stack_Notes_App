const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
        },
        emailId: {
            type: String,
            required: [true, 'Email ID is required'],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
        },
    },
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
