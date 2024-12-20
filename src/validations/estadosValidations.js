const {body, param} = require('express-validator');

const createEstados = [
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isString().withMessage('El nombre debe ser un string'),   
];

module.exports = {
    createEstados
};