const express = require('express');
const ordenController = require('../controllers/ordenController');
const validarCampos = require('../middlewares/validacion.js');
const ordenValidation = require('../validations/ordenValidations.js');


const router = express.Router();

//router
router.post('/insert',validarCampos(ordenValidation.createOrden), ordenController.insert);
router.put('/update',validarCampos(ordenValidation.updateOrden), ordenController.update);
router.get('/get', ordenController.getOrdenes);


module.exports = router;