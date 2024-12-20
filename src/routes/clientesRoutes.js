const express = require('express');
const ClientesController = require('../controllers/clientesController.js');
const validarCampos = require('../middlewares/validacion.js');
const clientesValidation = require('../validations/clienteValidations.js');


const router = express.Router();

//router
router.post('/insert', validarCampos(clientesValidation.createCliente),ClientesController.insert);
router.get('/get', ClientesController.get);
router.get('/get/:id', ClientesController.getById);


module.exports = router;