const express = require('express');
const CategoriaProductosController = require('../controllers/categoriaProductosController.js');
const validarCampos = require('../middlewares/validacion.js');
const categoriaProductosValidation = require('../validations/categoriaProductosValidations.js');

const router = express.Router();

//rutas
router.post('/insert', validarCampos(categoriaProductosValidation.createCategoriaProductos),
    CategoriaProductosController.insert);

router.put('/update', validarCampos(categoriaProductosValidation.updateCategoriaProductos),
    CategoriaProductosController.update);

router.put('/delete/:id', validarCampos(categoriaProductosValidation.deleteCategoriaProductos),
    CategoriaProductosController.delete);

router.get('/get', CategoriaProductosController.get);

router.get('/get/:id', validarCampos(categoriaProductosValidation.getCategoriaProductosById),
    CategoriaProductosController.getById);


module.exports = router;