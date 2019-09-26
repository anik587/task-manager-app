const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: Boolean,
        default: 1,
    }
})

module.exports = Task