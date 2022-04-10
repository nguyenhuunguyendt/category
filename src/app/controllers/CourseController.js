const { redirect } = require('express/lib/response')
const Course = require('../models/Course')
const { mongooseToObejct } = require('../util/mongoose')
class CourseController {
    show(req, res, next) {
        Course.findOne({ name: req.params.slug })
            .then(course => {
                res.render('course', {
                    course: mongooseToObejct(course)
                })
            })
            .catch(next)
    }
    create(req, res, next) {
        res.render('createCourse')
    }
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.video_id}/sddefault.jpg`
        const course = new Course(req.body)
        course.save().then(() => { res.redirect('/') })
            .catch()

    }
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                res.render('edit', {
                    course: mongooseToObejct(course)
                })
            })
            .catch(next)
    }
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => { res.redirect('back') })
            .catch(next)
    }
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => { res.redirect('back') })
            .catch(next)
    }
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}
module.exports = new CourseController;
