const express = require('express');
const estadosController = require('../controllers/estadosController.js');
const validarCampos = require('../middlewares/validacion.js');
const eValidations = require('../validations/estadosValidations.js');


const router = express.Router();

//rutas
router.post('/insert', validarCampos(eValidations.createEstados), estadosController.insert);
router.put('/update', validarCampos(eValidations.updateEstados), estadosController.update);
router.get('/get', estadosController.get);
router.get('/get/:idEstado', validarCampos(eValidations.getById), estadosController.getById);

module.exports = router;