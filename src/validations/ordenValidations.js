const { body, param } = require('express-validator');

const createOrden = [
    body('usuarios_idUsuarios')
        .notEmpty().withMessage('El id de usuario no puede estar vacio')
        .isInt().withMessage('El id de usuario debe ser un numero'),
    body('detalles')
        .notEmpty().withMessage('Los detalles no pueden estar vacios')
        .isArray().withMessage('Los detalles deben ser un array')
        .custom((detalles) => {
            detalles.forEach(detalle => {
                if (!detalle.Productos_idProductos || typeof detalle.Productos_idProductos !== 'number') {
                    throw new Error('Cada detalle debe contener un Productos_idProductos válido');
                }
                if (!detalle.cantidad || typeof detalle.cantidad !== 'number') {
                    throw new Error('Cada detalle debe contener una cantidad válida');
                }
                if (!detalle.precio || typeof detalle.precio !== 'number') {
                    throw new Error('Cada detalle debe contener un precio válido');
                }
                if (!detalle.subtotal || typeof detalle.subtotal !== 'number') {
                    throw new Error('Cada detalle debe contener un subtotal válido');
                }
            });
            return true;
        }),
];

const updateOrden = [
    body('idOrden')
        .notEmpty().withMessage('El id de la orden no puede estar vacio')
        .isInt().withMessage('El id de la orden debe ser un numero'),
    body('estados_idEstados')
        .notEmpty().withMessage('El id de estado no puede estar vacio')
        .isInt().withMessage('El id de estado debe ser un numero'),
    body('nombreCompleto')
        .notEmpty().withMessage('El nombre completo no puede estar vacio')
        .isString().withMessage('El nombre completo debe ser un string'),
    body('direccion')
        .notEmpty().withMessage('La direccion no puede estar vacia')
        .isString().withMessage('La direccion debe ser un string'),
    body('telefono')
        .notEmpty().withMessage('El telefono no puede estar vacio')
        .isString().withMessage('El telefono debe ser un string'),
    body('correoElectronico')
        .notEmpty().withMessage('El correo electronico no puede estar vacio')
        .isString().withMessage('El correo electronico debe ser un string'),
    body('fechaEntregaEstimada')
        .notEmpty().withMessage('La fecha de entrega estimada no puede estar vacia')
        .isDate({ format: 'YYYY-MM-DD' }).withMessage('La fecha de entrega estimada debe ser una fecha'),
    body('fechaEntregado')
        .optional()
        .isDate({ format: 'YYYY-MM-DD' }).withMessage('La fecha de entrega debe ser una fecha')
];

module.exports = {
    createOrden,
    updateOrden
};