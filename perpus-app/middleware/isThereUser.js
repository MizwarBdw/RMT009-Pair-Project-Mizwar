function isThereUser(req) {
    return req.session.user ? true : false
}

module.exports = {isThereUser}