var express = require('express');
var router = express.Router();

const registerController = require('../controllers/register.controller');


/* GET users listing. */
router.post('/register', registerController.addUser);

/*  users login. */
router.post('/login', registerController.userLogin);

/*  to generate acces token. */
router.post('/Token', registerController.Token);

module.exports = router;
