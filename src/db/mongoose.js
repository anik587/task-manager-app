const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const User = mongoose.model('user', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})


const me = new User({
    name: 'anik',
    age: 29
})

me.save(). then(result =>{
    console.log(result)
}).catch(error => {
    console.log(error)
})