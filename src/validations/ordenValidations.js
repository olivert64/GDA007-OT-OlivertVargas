const {body, param} = require('express-validator');

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

module.exports = {
    createOrden
};