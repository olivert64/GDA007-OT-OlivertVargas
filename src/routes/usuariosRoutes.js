const express = require('express');
const UsuariosController = require('../controllers/usuariosController.js');

const router = express.Router();

//router
router.post('/insert', UsuariosController.insert);


module.exports = router;