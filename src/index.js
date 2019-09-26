const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const bodyParser  = require('body-parser');
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3002;

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// user CRUD
app.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save();
        res.send(user)
    }catch (e){
        res.status(400).send(e)
    }
})

app.get('/user', async (req, res)=>{

    try{
        let user = await User.find({})
        if(user)
        return res.status(200).send(user)
        return res.status(404).send('User Not Found')
    }catch(e){
        res.status(500).send(e)
    }

})

app.get('/user/:id', async (req, res)=>{

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

// task CRUD
app.post('/tasks', async (req, res)=>{
    const task = new Task(req.body)

    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/task', async (req, res)=>{

    try{
        let task = await Task.find({});
        if(task)
            res.status(200).send(task)
            res.status(404).send('Task Not Found')
    }catch(e){
        res.status(500).send(e)
    }
})


app.get('/task/:id', async (req, res)=>{

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


// catch 404 and forward to error handler
app.use((req, res, next) =>{
    next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).send(err);
});

app.listen(port, ()=>{
    console.log('Server listening at ' + port)
})