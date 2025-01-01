const express = require('express');
const CategoriaProductosController = require('../controllers/categoriaProductosController.js');
const validarCampos = require('../middlewares/validacion.js');
const categoriaProductosValidation = require('../validations/categoriaProductosValidations.js');
const rol = require('../utils/constantes/roles.js');
const rolAuth = require('../middlewares/authRoles.js');

const router = express.Router();

//rutas
router.post('/insert', validarCampos(categoriaProductosValidation.createCategoriaProductos),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    CategoriaProductosController.insert);

router.put('/update', validarCampos(categoriaProductosValidation.updateCategoriaProductos),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    CategoriaProductosController.update);

router.put('/delete/:id', validarCampos(categoriaProductosValidation.deleteCategoriaProductos),
    rolAuth(rol.ADMIN, rol.OPERADOR),
    CategoriaProductosController.delete);

router.get('/get', rolAuth(rol.ADMIN, rol.OPERADOR, rol.CLIENTE),
    rolAuth(rol.ADMIN, rol.OPERADOR, rol.CLIENTE),
    CategoriaProductosController.get);

router.get('/get/:id', validarCampos(categoriaProductosValidation.getCategoriaProductosById),
    rolAuth(rol.ADMIN, rol.OPERADOR, rol.CLIENTE),
    CategoriaProductosController.getById);


module.exports = router;