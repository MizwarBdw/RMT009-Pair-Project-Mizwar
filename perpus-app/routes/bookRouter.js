const router = require('express').Router();
const Controller = require('../controllers/bookController')
const checkLogin = require('../middleware/checkLogin')
const isAdmin = require('../middleware/isAdmin')

router.get('/list', checkLogin, Controller.showList);

router.get('/add', isAdmin, Controller.addGet);
router.post('/add', Controller.addPost);

router.get('/:id/edit', isAdmin, Controller.editGet);
router.post('/:id/edit', Controller.editPost);

router.get('/:id/rent', checkLogin, Controller.getRentBook);
router.post('/:id/rent',Controller.postRentBook);

router.get('/:id/delete', isAdmin, Controller.delete);

module.exports = router