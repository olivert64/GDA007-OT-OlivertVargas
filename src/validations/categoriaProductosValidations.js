const {body, param} = require('express-validator');

const createCategoriaProductos = [
    body('usuario_idUsuario')
        .notEmpty().withMessage('El id de usuario no puede estar vacio')
        .isInt().withMessage('El id de usuario debe ser un numero'),
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isString().withMessage('El nombre debe ser un string'),
    body('estado_idEstado')
        .notEmpty().withMessage('El id de estado no puede estar vacio')
        .isInt().withMessage('El id de estado debe ser un numero'),
];

module.exports = {
    createCategoriaProductos
};