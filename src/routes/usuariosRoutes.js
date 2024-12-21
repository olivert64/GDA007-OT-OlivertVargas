const express = require('express');
const UsuariosController = require('../controllers/usuariosController.js');
const validarCampos = require('../middlewares/validacion.js');
const usuariosValidation = require('../validations/usuariosValidations.js');


const router = express.Router();

//router
router.post('/insert', validarCampos(usuariosValidation.createUsuarios),UsuariosController.insert);
router.put('/update', validarCampos(usuariosValidation.updateUsuarios), UsuariosController.update);
router.put('/:id',  validarCampos(usuariosValidation.deleteUsuarios), UsuariosController.delete);
router.get('/get', UsuariosController.get);
router.get('/get/:id',  validarCampos(usuariosValidation.getUsuariosId), UsuariosController.getById);



module.exports = router;