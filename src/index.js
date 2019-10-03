const express = require('express')
const createError = require('http-errors')
const cors = require('cors')
const bodyParser  = require('body-parser')
require('./db/mongoose')



const app = express()
const port = process.env.PORT || 3002

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const userRoute = require('./routers/users')
const taskRoute = require('./routers/tasks')

app.use(userRoute)
app.use(taskRoute)



// catch 404 and forward to error handler
app.use((req, res, next) =>{
    next(createError(404))
})

// error handler
app.use((err, req, res, next)=> {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500).send(err);
})

app.listen(port, ()=>{
    console.log('Server listening at ' + port)
})
