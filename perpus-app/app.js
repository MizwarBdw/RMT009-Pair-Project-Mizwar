const express = require('express')
const app = express()
const PORT = 3000
const indexRouter = require('./routes/index')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}))

app.use(indexRouter)

app.listen(PORT, ()=> {
    console.log(`This app running on PORT : ${PORT}`)
})