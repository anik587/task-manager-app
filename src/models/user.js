const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('user', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password Cannot Contain "password"')
            }else if(value.includes(' ')){
                throw new Error('Password must not have space')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age Must Be Grater Then 0')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email Address Required')
            }
        }
    }
})

module.exports = User