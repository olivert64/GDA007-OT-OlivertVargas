const ProductosService = require('../services/productosService.js');
const response = require('../utils/response.js');

class ProductosController {

    static async insert(req, res) {

        
        try {

            const data = req.body;

            const result = await ProductosService.insertProductos(data);

            response.success(res, 'Producto creado Correctamente', result, 201);

            //return res.status(201).json({ message: 'Producto creado Correctamente.' });

        } catch (error) {
            console.error('Error al crear el producto:', error);
            return res.status(500).json({ error: 'Error al crear el producto.' });
        }
    }

    static async delete(req, res) {
        try {
            const idProducto = req.params.idProducto;

            const result = await ProductosService.deleteProductos(idProducto);
            response.success(res, 'Producto eliminado Correctamente', result, 200);
            //return res.status(200).json({ message: 'Producto desactivado correctamente' });

        } catch (error) {
            console.error('Error al desactivar el producto:', error);
            return res.status(500).json({ error: 'Error al desactivar el producto.' });

        }
    }

    static async update(req, res) {
        try {
            const data = req.body;

            const result = await ProductosService.updateProductos(data);
            response.success(res, 'Producto actualizado Correctamente', result, 200);
            //return res.status(200).json({ message: 'El Producto fue actualizado correctamente.' });

        } catch (error) {
            console.error('Error al actualizar el producto: ', error);
            return res.status(500).json({ error: 'Error al actualizar el producto. ' });
        }
    };

    static async get(req, res) {
        try {
            const data = await ProductosService.obtenerProductos();
            response.success(res, 'Productos encontrados', data, 200);

            
            //return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al consultar datos' });
        }
    }

    static async getById(req, res) {
        try {
            const idProducto = req.params.idProducto;

            const data = await ProductosService.obtenerProductoId(idProducto);
            response.success(res, 'Producto encontrado', data, 200);
            //return res.status(200).json(data);

        } catch (error) {
            console.error('Error al obtener el producto:', error);
            return res.status(500).json({ error: 'Error al obtener el producto.' });
        }
    }

}

module.exports = ProductosController;