const express = require('express');
const estadosController = require('../controllers/estadosController.js');

const router = express.Router();

//rutas
router.get('/get', estadosController.get);
router.get('/get/:idEstado', estadosController.getById);

module.exports = router;