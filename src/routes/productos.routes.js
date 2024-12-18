const express = require('express');
const ProductosController = require('../controllers/productos.controller.js');

const router = express.Router();

//rutas
router.post('/insert', ProductosController.insert);

router.put('/update', ProductosController.update);

router.delete('/delete/:idProducto', ProductosController.delete);

router.get('/get', ProductosController.get);



module.exports = router;