const express = require('express');
const UsuariosController = require('../controllers/usuariosController.js');
const validarCampos = require('../middlewares/validacion.js');
const usuariosValidation = require('../validations/usuariosValidations.js');
const rol = require('../utils/constantes/roles.js');
const rolAuth = require('../middlewares/authRoles.js');



const router = express.Router();

//router
router.post('/insert', validarCampos(usuariosValidation.createUsuarios),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    UsuariosController.insert);

router.put('/update', validarCampos(usuariosValidation.updateUsuarios),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    UsuariosController.update);

router.put('/:id', validarCampos(usuariosValidation.deleteUsuarios),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    UsuariosController.delete);

router.get('/get', rolAuth(rol.ADMIN, rol.OPERADOR), UsuariosController.get);

router.get('/get/:id', validarCampos(usuariosValidation.getUsuariosId),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    UsuariosController.getById);



module.exports = router;