const express = require('express')
const router = new express.Router()
const Task = require('../models/task')


// save new task
router.post('/tasks', async (req, res)=>{
    const task = new Task(req.body)

    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


// get all tasks list
router.get('/task', async (req, res)=>{

    try{
        let task = await Task.find({});
        if(task)
            res.status(200).send(task)
        res.status(404).send('Task Not Found')
    }catch(e){
        res.status(500).send(e)
    }
})


// get individual task
router.get('/task/:id', async (req, res)=>{

    const _id = req.params.id;
    try{
        let task = await Task.findById(_id)
        if(task)
            return res.send(task)
        return res.status(404).send('Task Not Found')

    }catch(e){
        res.status(500).send(e)
    }

})

// update individual task

router.patch('/task/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['status', 'description']
    const isValidateOperation = updates.every((update) => allowUpdates.includes(update))

    if(!isValidateOperation)
        return res.status().send({error: 'Invalid Request'})

    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        if(!task)
            return res.status(404).send()
            return res.status(200).send(task)
    }catch (e) {
        return res.status(500).send(e)
    }

})

// delete individual task

router.delete('/task/:id', async(req, res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task)
            return res.status(404).send()
        return res.status(200).send(task)

    }catch(e){
        return res.status(500).send(e)
    }
})



module.exports = router