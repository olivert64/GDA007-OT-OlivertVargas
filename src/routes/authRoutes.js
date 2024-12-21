const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsuariosService = require('../services/usuariosService.js');
const authController = require('../controllers/authController.js');
require('dotenv').config();

const router = express.Router();

router.post('/login', authController.login);

module.exports = router;