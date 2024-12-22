const {body, param} = require('express-validator');

const createCategoriaProductos = [
    body('usuario_idUsuarios')
        .notEmpty().withMessage('El id de usuario no puede estar vacio')
        .isInt().withMessage('El id de usuario debe ser un numero'),
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isString().withMessage('El nombre debe ser un string')
];

const updateCategoriaProductos = [
    body('idCategoriaProducto')
        .notEmpty().withMessage('El id de categoria producto no puede estar vacio')
        .isInt().withMessage('El id de categoria producto debe ser un numero'),
    body('usuario_idUsuarios')
        .notEmpty().withMessage('El id de usuario no puede estar vacio')
        .isInt().withMessage('El id de usuario debe ser un numero'),
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isString().withMessage('El nombre debe ser un string'),
    body('estados_idEstados')
        .notEmpty().withMessage('El id de estado no puede estar vacio')
        .isInt().withMessage('El id de estado debe ser un numero')
];

const deleteCategoriaProductos = [
    param('id')
        .notEmpty().withMessage('El id de categoria producto no puede estar vacio')
        .isInt().withMessage('El id de categoria producto debe ser un numero')
];

const getCategoriaProductosById = [ 
    param('id')
        .notEmpty().withMessage('El id de categoria producto no puede estar vacio')
        .isInt().withMessage('El id de categoria producto debe ser un numero')
];

module.exports = {
    createCategoriaProductos,
    updateCategoriaProductos,
    deleteCategoriaProductos,
    getCategoriaProductosById
};