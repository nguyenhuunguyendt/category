const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 8000

const route = require('./routes')
const db = require('./config/connectDb')

db.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})