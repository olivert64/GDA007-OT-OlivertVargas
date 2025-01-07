const express = require('express');
const ProductosController = require('../controllers/productosController.js');
const validarCampos = require('../middlewares/validacion.js');
const productosValidation = require('../validations/productoValidations.js');
const rol = require('../utils/constantes/roles.js');
const rolAuth = require('../middlewares/authRoles.js');

const router = express.Router();

//rutas
router.post('/insert', validarCampos(productosValidation.createProducto),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    ProductosController.insert);

router.put('/update', validarCampos(productosValidation.updateProducto),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    ProductosController.update);

router.put('/delete/:idProducto', validarCampos(productosValidation.deleteProducto),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    ProductosController.delete);

router.get('/get', rolAuth(rol.ADMIN, rol.OPERADOR, rol.CLIENTE), ProductosController.get);

router.get('/get/:idProducto', validarCampos(productosValidation.getProductoId),
    rolAuth(rol.ADMIN, rol.OPERADOR, rol.CLIENTE),
    ProductosController.getById);


module.exports = router;