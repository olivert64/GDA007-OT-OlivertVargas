const express = require('express');
const ProductosController = require('../controllers/productosController.js');

const router = express.Router();

//rutas
router.post('/insert', ProductosController.insert);

router.put('/update', ProductosController.update);

router.delete('/delete/:idProducto', ProductosController.delete);

router.get('/get', ProductosController.get);

router.get('/get/:idProducto', ProductosController.getById);



module.exports = router;