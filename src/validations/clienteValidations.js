const {body, param} = require('express-validator');

const createCliente = [
    body('razonSocial')
        .notEmpty().withMessage('La razon social no puede estar vacia')
        .isString().withMessage('La razon social debe ser un string'),
    body('nombreComercial')
        .notEmpty().withMessage('El nombre comercial no puede estar vacio')
        .isString().withMessage('El nombre comercial debe ser un string'),
    body('direccionEntrega')
        .notEmpty().withMessage('La direccion de entrega no puede estar vacia')
        .isString().withMessage('La direccion de entrega debe ser un string'),
    body('telefono')
        .isString().withMessage('El telefono debe ser un string'),
    body('email')
        .notEmpty().withMessage('El correo no puede estar vacio')
        .isEmail().withMessage('El correo debe ser un email')
        .isString().withMessage('El correo debe ser un string')
];

module.exports = {
    createCliente
};