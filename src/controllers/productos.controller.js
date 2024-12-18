const ProductosService = require('../services/productos.service.js');

class ProductosController {

    static async insert(req, res) {
        try {

            const data = req.body;

            const camposRequeridos = [
                'CategoriaProductos_idCategoriaProductos',
                'usuarios_idUsuarios',
                'nombre',
                'marca',
                'codigo',
                'cantidad',
                'estados_idEstados',
                'precio',
            ];

            for (const campo of camposRequeridos) {
                if (!data[campo]) {
                    return res.status(400).json({ error: `El campo ${field} es obligatorio.` });
                }
            }

            await ProductosService.insertProductos(data);

            return res.status(201).json({ message: 'Producto creado Correctamente.' });

        } catch (error) {
            console.error('Error al crear el producto:', error);
            return res.status(500).json({ error: 'Error al crear el producto.' });
        }
    }

    static async delete(req, res) {
        try {
            const idProducto = req.params.idProducto;

            if (!idProducto) {
                return res.status(400).json({ error: 'El ID del producto es obligatorio.' });
            }

            await ProductosService.deleteProductos(idProducto);

            return res.status(200).json({ message: 'Producto desactivado correctamente' });

        } catch (error) {
            console.error('Error al desactivar el producto:', error);
            return res.status(500).json({ error: 'Error al desactivar el producto.' });

        }
    }

    static async update(req, res) {
        try {
            const data = req.body;

            if (!data.idProducto) {
                return res.status(400).json({ error: 'El Id del producto es obligatorio...' });
            }

            await ProductosService.updateProductos(data);

            return res.status(200).json({ message: 'El Producto fue actualizado correctamente.' });

        } catch (error) {
            console.error('Error al actualizar el producto: ', error);
            return res.status(500).json({ error: 'Error al actualizar el producto. ' });
        }
    };

    static async get(req, res) {
        try {
            const data = await ProductosService.obtenerProductos();
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al consultar datos' });
        }
    }

}

module.exports = ProductosController;