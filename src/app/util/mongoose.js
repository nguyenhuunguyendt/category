module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongooseToObejct: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    }
}