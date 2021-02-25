module.exports = (req, res, next) => {
    if(req.session.user) {
        if(req.session.user.isLogedIn === true) {
            next()
        }else {
            res.redirect('/login')
        }
    } else{
        res.redirect('/login')
    }
}