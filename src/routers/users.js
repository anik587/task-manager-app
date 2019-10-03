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

// update individual user

router.patch('/user/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowOperator = ['name', 'password', 'age', 'email']
    const isValidOperation = updates.every((update) => allowOperator.includes(update))
    if(!isValidOperation)
        return res.status().send({error: 'Invalid Request'})
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        if(!user)
            return res.status(404).send()
            return res.status(200).send(user)

    }catch (e) {
        return res.status(500).send(e)
    }


})


// delete individual user

router.delete('/user/:id', async (req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user)
            return res.status(404).send()
            return res.status(200).send(user)
    }catch (e) {
        return res.status(500).send(e)
    }

})

module.exports = router
