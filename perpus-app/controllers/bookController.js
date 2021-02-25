const { Book, User, UserBook } = require('../models/index');
const {isThereUser} = require('../middleware/isThereUser')

class Controller {
    
    // Get BOOK
    static getRentBook(req, res) {
        // TAMPILIN TABEL DAN JUMLAH 
        // KASI FILL PENGURANGAN

        // Book.findAll()
        //     .then((books) => {

        //     })
        //     .catch((err) => {
        //         res.send(err)
        //     })
    }
    // POST BOOK
    static postRentBook(req, res) {
        

        // Book.update()
        // .then((books) => {

        // })
        // .catch((err) => {
        //     res.send(err)
        // })
    }

    // ShowList
    static showList(req, res) {
        Book.findAll({
            include: User
        })
            .then((books) => {
                res.render('bookList', { books, user: isThereUser(req) })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    // AddGet
    static addGet(req, res) {
        res.render('addBook', { user: isThereUser(req)})
    }

    // AddPost
    static addPost(req, res) {
        let newBook = {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: +req.body.stock
        }
        Book.create(newBook)
            .then((books) => {
                res.redirect('/books/list')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    // EditGet
    static editGet(req, res) {
        Book.findOne({
            where: { id: +req.params.id }
        })
            .then((book) => {
                res.render('editBook', { book, user: isThereUser(req) })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    // EditPost
    static editPost(req, res) {
        let editedBook = {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: +req.body.stock
        }
        Book.update(editedBook, { where: { id: +req.params.id } })
            .then((book) => {
                res.redirect('/books/list')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    // Delete
    static delete(req, res) {
        Book.destroy({
            where: { id: req.params.id }
        })
            .then((book) => {
                res.redirect('/books/list')
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = Controller