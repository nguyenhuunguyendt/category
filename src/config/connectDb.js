const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/shopping', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect Db success !')
    } catch (error) {
        console.log('connect Db fail')
    }
}

module.exports = { connect }