const express = require('express');
const router = express.Router();
const { CreateUser, Userlogin} = require('../controllers/authcontroller');

router.post('/register', CreateUser);
router.post('/login', Userlogin);


module.exports = router;
