const {body, param} = require('express-validator');

const createProducto = [    
    body('CategoriaProductos_idCategoriaProductos')
        .notEmpty().withMessage('Id de categoria no puede estar vacia')
        .isInt().withMessage('Id de categoria debe ser un numero'),
    body('usuarios_idUsuarios')
        .notEmpty().withMessage('El id usuario no puede estar vacio')
        .isInt().withMessage('El id usuario debe ser un numero'),
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isString().withMessage('El nombre debe ser un string'),
    body('marca')
        .notEmpty().withMessage('La marca no puede estar vacia')
        .isString().withMessage('La marca debe ser un string'),
    body('codigo')
        .notEmpty().withMessage('El codigo no puede estar vacio')
        .isString().withMessage('El codigo debe ser un string'),
    body('cantidad')
        .notEmpty().withMessage('La cantidad no puede estar vacia')
        .isInt().withMessage('La cantidad debe ser un numero'),
    body('precio')
        .notEmpty().withMessage('El precio no puede estar vacio')
        .isFloat().withMessage('El precio debe ser un numero'),
    body('fotoUrl')
        .optional()
        .isString().withMessage('La url de la foto debe ser un string')
];

const updateProducto = [
    body('idProducto')
        .notEmpty().withMessage('El id del producto no puede estar vacio')
        .isInt().withMessage('El id del producto debe ser un numero'),
    body('CategoriaProductos_idCategoriaProductos')
        .notEmpty().withMessage('Id de categoria no puede estar vacia')
        .isInt().withMessage('Id de categoria debe ser un numero'),
    body('usuarios_idUsuarios')
        .notEmpty().withMessage('El id usuario no puede estar vacio')
        .isInt().withMessage('El id usuario debe ser un numero'),
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isString().withMessage('El nombre debe ser un string'),
    body('marca')
        .notEmpty().withMessage('La marca no puede estar vacia')
        .isString().withMessage('La marca debe ser un string'),
    body('codigo')
        .notEmpty().withMessage('El codigo no puede estar vacio')
        .isString().withMessage('El codigo debe ser un string'),
    body('cantidad')
        .notEmpty().withMessage('La cantidad no puede estar vacia')
        .isInt().withMessage('La cantidad debe ser un numero'),
    body('estados_idEstados')
        .notEmpty().withMessage('El id de estado no puede estar vacio')
        .isInt().withMessage('El id de estado debe ser un numero'),
    body('precio')
        .notEmpty().withMessage('El precio no puede estar vacio')
        .isFloat().withMessage('El precio debe ser un numero'),
    body('fotoUrl')
        .optional()
        .isString().withMessage('La url de la foto debe ser un string')
];

const deleteProducto = [
    param('idProducto')
        .notEmpty().withMessage('El id del producto no puede estar vacio')
        .isInt().withMessage('El id del producto debe ser un numero')
];

const getProductoId = [
    param('idProducto')
        .notEmpty().withMessage('El id del producto no puede estar vacio')
        .isInt().withMessage('El id del producto debe ser un numero')
];

module.exports = {
    createProducto,
    updateProducto,
    deleteProducto,
    getProductoId
};