const {User, Book} = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const nodemailer = require('nodemailer')
const {isThereUser} = require('../middleware/isThereUser')

class Controller {
    static home(req, res){
        Book.findAll()
        .then(data => {
            res.render('home', {
                user: isThereUser(req),
                data
            })
        })

        .catch(err => {
            res.send(err)
        })
    }

    static findAll(req, res){
        User.findAll()

        .then(data => {
            res.render('user_list', {
                title: 'USER LIST',
                user: isThereUser(req),
                data
            })
        })

        .catch(err => {
            res.send(err)
        })
    }

    static getAddUser(req, res){
        res.render('user_add', {
            title: 'REGISTER',
            user: isThereUser(req)
        })
    }

    static postAddUser(req, res){
        let newData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            role: req.body.role,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        User.create(newData)
        .then((data) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'badawi.mizwar@gmail.com',
                    pass: 'iwgmqpdvjiyfequz'
                }
            })
            const mailOptions = {
                from: 'badawi.mizwar@gmail.com',
                to: data.email,
                subject: 'succses register',
                text: `${data.first_name} ${data.last_name} welcome to Perpus App, now you can search and rent books of your choice! for free!`
            }
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) throw err;
                res.redirect('/login')
            });
        })

        .catch(err => {
            res.send(err)
        })
    }

    static getEditUser(req, res){
        let choosenId = +req.params.id

        User.findOne({
            where: {
                id: choosenId
            }
        })

        .then(data => {
            res.render('user_edit', {
                title: 'Edit User',
                user: isThereUser(req),
                data
            })
        })

        .catch(err => {
            res.send(err)
        })
    }

    static postEditUser(req, res){
        let choosenId = +req.params.id
        let newData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            role: req.body.role,
            email: req.body.email,
            username: req.body.username
        }

        User.update(newData, {
            where: {
                id: choosenId
            }
        })

        .then(() => {
            res.redirect('/users/list')
        })

        .catch(err => {
            res.send(err)
        })
    }

    static deleteUser(req, res){
        let choosenId = +req.params.id

        User.destroy({
            where:{
                id: choosenId
            }
        })

        .then(() => {
            res.redirect('/users/list')
        })

        .catch(err => {
            res.send(err)
        })
    }

    static getLogin(req, res){
        res.render('login', {
            user: isThereUser(req)
        })
    }

    static postLogin(req, res){
        let dataInput = {
            username: req.body.username,
            password: req.body.password
        }

        User.findOne({
             where: {
                username: dataInput.username
             }
        })

        .then(data => {
            const correctPassword = comparePassword(dataInput.password, data.password)
            
            if (!correctPassword){
                throw err
            } else {
                req.session.user = {
                    isLogedIn : true,
                    id: data.id,
                    username: data.username,
                    role: data.role
                }
                    res.redirect('/')
                }
        })
        
        .catch(err => {
            res.send(err)
        })
    }

    static logout(req, res){
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }

    static failed(req, res){
        res.render('failed', {
            message: req.query.message
        })
    }
}

module.exports = Controller