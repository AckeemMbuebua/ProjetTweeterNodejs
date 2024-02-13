const express = require('express');
const { showUsers, createUser, deletedUser, loginUsers } = require('../controllers/userControllers');
const router = express.Router();

router.get('/', showUsers);
router.post('/', createUser);
router.delete('/:idUser', deletedUser);
router.post('/auth', loginUsers);

module.exports = router
