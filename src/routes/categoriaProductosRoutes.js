const express = require('express');
const CategoriaProductosController = require('../controllers/categoriaProductosController.js');

const router = express.Router();

//rutas
router.post('/insert', CategoriaProductosController.insert);
router.put('/update', CategoriaProductosController.update);
router.delete('/delete/:idCategoriaProducto', CategoriaProductosController.delete);
router.get('/get', CategoriaProductosController.get);
router.get('/get/:idCategoriaProducto', CategoriaProductosController.getById);


module.exports = router;