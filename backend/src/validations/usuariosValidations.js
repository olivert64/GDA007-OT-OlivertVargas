const { body, param } = require('express-validator');
const roles = require('../utils/constantes/roles.js');

const createUsuarios = [
    body('rol_idRol')
        .notEmpty().withMessage('El id de rol no puede estar vacio')
        .isInt().withMessage('El id de rol debe ser un numero')
        .custom(value => {
            if (value !== roles.OPERADOR && value !== roles.CLIENTE) {
                throw new Error('El rol debe ser Operador o Cliente');
            }
            return true;
        }),
    body('correoElectronico')
        .notEmpty().withMessage('El correo no puede estar vacio')
        .isEmail().withMessage('El correo debe ser un email')
        .isString().withMessage('El correo debe ser un string'),
    body('nombreCompleto')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isString().withMessage('El nombre debe ser un string'),
    body('passwrd')
        .notEmpty().withMessage('La contraseña no puede estar vacia')
        .isString().withMessage('La contraseña debe ser un string')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener un minimo de 6 caracteres'),
    body('direccion')
        .notEmpty().withMessage('La direccion no puede estar vacia')
        .isString().withMessage('La direccion debe ser un string'),
    body('telefono')
        .notEmpty().withMessage('El telefono no puede estar vacio')
        .isString().withMessage('El telefono debe ser un string'),
    body('fechaNacimiento')
        .notEmpty().withMessage('La fecha de nacimiento no puede estar vacia')
        .isDate({ format: 'YYYY-MM-DD' }).withMessage('La fecha de nacimiento debe ser en formato YYYY-MM-DD'),
    body('Cliente_idCliente')
        .optional()
        .isInt().withMessage('El id de cliente debe ser un numero'),

];

const updateUsuarios = [
    body('idUsuario')
        .notEmpty().withMessage('El id de usuario no puede estar vacio')
        .isInt().withMessage('El id de usuario debe ser un numero'),
    body('rol_idRol')
        .notEmpty().withMessage('El id de rol no puede estar vacio')
        .isInt().withMessage('El id de rol debe ser un numero')
        .custom(value => {
            if (value !== roles.OPERADOR && value !== roles.CLIENTE) {
                throw new Error('El rol debe ser Operador o Cliente');
            }
            return true;
        }),
    body('estados_idEstados')
        .notEmpty().withMessage('El id de estado no puede estar vacio')
        .isInt().withMessage('El id de estado debe ser un numero'),
    body('correoElectronico')
        .notEmpty().withMessage('El correo no puede estar vacio')
        .isEmail().withMessage('El correo debe ser un email')
        .isString().withMessage('El correo debe ser un string'),
    body('nombreCompleto')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isString().withMessage('El nombre debe ser un string'),
    body('passwrd')
        .notEmpty().withMessage('La contraseña no puede estar vacia')
        .isString().withMessage('La contraseña debe ser un string')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener un minimo de 6 caracteres'),
    body('direccion')
        .notEmpty().withMessage('La direccion no puede estar vacia')
        .isString().withMessage('La direccion debe ser un string'),
    body('telefono')
        .notEmpty().withMessage('El telefono no puede estar vacio')
        .isString().withMessage('El telefono debe ser un string'),
    body('fechaNacimiento')
        .notEmpty().withMessage('La fecha de nacimiento no puede estar vacia')
        .isDate({ format: 'YYYY-MM-DD' }).withMessage('La fecha de nacimiento debe ser en formato YYYY-MM-DD'),
    body('Cliente_idCliente')
        .optional()
        .isInt().withMessage('El id de cliente debe ser un numero'),

];

const deleteUsuarios = [
    param('id')
        .notEmpty().withMessage('El id de usuario no puede estar vacio')
        .isInt().withMessage('El id de usuario debe ser un numero')
];

const getUsuariosId = [
    param('id')
        .notEmpty().withMessage('El id de usuario no puede estar vacio')
        .isInt().withMessage('El id de usuario debe ser un numero')
];

module.exports = {
    createUsuarios,
    updateUsuarios,
    deleteUsuarios,
    getUsuariosId
};
