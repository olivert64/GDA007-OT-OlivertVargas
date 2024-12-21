const express = require('express');
const ProductosController = require('../controllers/productosController.js');
const validarCampos = require('../middlewares/validacion.js');
const productosValidation = require('../validations/productoValidations.js');

const router = express.Router();

//rutas
router.post('/insert', validarCampos(productosValidation.createProducto),
    ProductosController.insert);

router.put('/update', validarCampos(productosValidation.updateProducto),
    ProductosController.update);

router.delete('/delete/:idProducto', validarCampos(productosValidation.deleteProducto),
    ProductosController.delete);

router.get('/get', ProductosController.get);

router.get('/get/:idProducto', validarCampos(productosValidation.getProductoId),
    ProductosController.getById);


module.exports = router;