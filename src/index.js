const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const port = 3000

const route = require('./routes')
const db = require('./config/db')

db.connect()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('combined'))
app.use(methodOverride('_method'))
app.engine('handlebars', handlebars(
    {
        helpers: {
            sum: (a, b) => a + b,
        }
    }
))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})