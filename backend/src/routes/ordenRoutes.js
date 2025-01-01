const express = require('express');
const ordenController = require('../controllers/ordenController');
const validarCampos = require('../middlewares/validacion.js');
const ordenValidation = require('../validations/ordenValidations.js');
const rol = require('../utils/constantes/roles.js');
const rolAuth = require('../middlewares/authRoles.js');


const router = express.Router();

//router
router.post('/insert', validarCampos(ordenValidation.createOrden),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    ordenController.insert);

router.put('/update', validarCampos(ordenValidation.updateOrden),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    ordenController.update);

router.get('/get', rolAuth(rol.ADMIN, rol.OPERADOR, rol.CLIENTE),
    ordenController.getOrdenes);


module.exports = router;