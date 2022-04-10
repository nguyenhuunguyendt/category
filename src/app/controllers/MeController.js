const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../util/mongoose')
class MeController {
    storedCourses(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next)
    }
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => {
                res.render('me/strash-courses', {
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next)
    }
}
module.exports = new MeController;
