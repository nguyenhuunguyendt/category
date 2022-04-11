const homeRouter = require('./home')
const categoryRouter = require('./category')
function route(app) {
    app.use('/categories', categoryRouter)
    app.use('/', homeRouter)
}
module.exports = route