const express = require('express');
const ClientesController = require('../controllers/clientesController.js');
const validarCampos = require('../middlewares/validacion.js');
const clientesValidation = require('../validations/clienteValidations.js');


const router = express.Router();

//router
router.post('/insert', validarCampos(clientesValidation.createCliente),
    ClientesController.insert);

router.put('/update', validarCampos(clientesValidation.updateCliente),
    ClientesController.update);

router.put('/delete/:id', validarCampos(clientesValidation.deleteCliente),
    ClientesController.delete);

router.get('/get', ClientesController.get);

router.get('/get/:id', validarCampos(clientesValidation.getClienteId),
    ClientesController.getById);


module.exports = router;