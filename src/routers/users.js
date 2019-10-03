const express = require('express')
const router = new express.Router()
const User = require('../models/user')


// save new user
router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save();
        res.send(user)
    }catch (e){
        res.status(400).send(e)
    }
})

// get all users list
router.get('/user', async (req, res)=>{

    try{
        let user = await User.find({})
        if(user)
            return res.status(200).send(user)
        return res.status(404).send('User Not Found')
    }catch(e){
        res.status(500).send(e)
    }

})


// get individual user
router.get('/user/:id', async (req, res)=>{

    const _id = req.params.id;
    try{
        let user = await User.findById(_id)
        if(user)
            return res.send(user)
        return res.status(404).send('User Not Found')
    }catch(e){
        res.status(500).send(e)
    }


})

module.exports = router
