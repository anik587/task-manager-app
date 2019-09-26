const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const bodyParser  = require('body-parser');
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3002;

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/users', (req, res)=>{
    const user = new User(req.body)
    user.save().then((result)=>{
        res.send(result)
    }).catch(error => {
        res.send(error)
    })
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
    res.status(err.status || 500).send('error');
});

app.listen(port, ()=>{
    console.log('Server listening at ' + port)
})