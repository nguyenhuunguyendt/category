class HomeController {
    index(req, res, next) {
        res.send("Hello")
    }
}
module.exports = new HomeController;
