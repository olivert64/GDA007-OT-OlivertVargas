const express = require('express');
const ClientesController = require('../controllers/clientesController.js');
const validarCampos = require('../middlewares/validacion.js');
const clientesValidation = require('../validations/clienteValidations.js');
const rol = require('../utils/constantes/roles.js');
const rolAuth = require('../middlewares/authRoles.js');


const router = express.Router();

//router
router.post('/insert', validarCampos(clientesValidation.createCliente),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    ClientesController.insert);

router.put('/update', validarCampos(clientesValidation.updateCliente),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    ClientesController.update);

router.put('/delete/:id', validarCampos(clientesValidation.deleteCliente),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    ClientesController.delete);

router.get('/get', rolAuth(rol.ADMIN, rol.OPERADOR), ClientesController.get);

router.get('/get/:id', validarCampos(clientesValidation.getClienteId),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    ClientesController.getById);


module.exports = router;