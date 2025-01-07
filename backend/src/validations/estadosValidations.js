const {body, param} = require('express-validator');

const createEstados = [
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isString().withMessage('El nombre debe ser un string'),   
];

const updateEstados = [
    body('idEstado')
        .notEmpty().withMessage('El idEstado es obligatorio')
        .isInt().withMessage('El idEstado debe ser un número entero'),
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isString().withMessage('El nombre debe ser un string')
];

const getById = [
    param('idEstado')
        .notEmpty().withMessage('El idEstado es obligatorio')
        .isInt().withMessage('El idEstado debe ser un número entero')
];

module.exports = {
    createEstados,
    updateEstados,
    getById
};