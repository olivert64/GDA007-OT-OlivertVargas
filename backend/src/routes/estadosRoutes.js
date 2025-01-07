const express = require('express');
const estadosController = require('../controllers/estadosController.js');
const validarCampos = require('../middlewares/validacion.js');
const eValidations = require('../validations/estadosValidations.js');
const rol = require('../utils/constantes/roles.js');
const rolAuth = require('../middlewares/authRoles.js');


const router = express.Router();

//rutas
router.post('/insert', validarCampos(eValidations.createEstados),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    estadosController.insert);

router.put('/update', validarCampos(eValidations.updateEstados),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    estadosController.update);

router.get('/get', rolAuth(rol.ADMIN, rol.OPERADOR), estadosController.get);

router.get('/get/:idEstado', validarCampos(eValidations.getById),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    estadosController.getById);

module.exports = router;