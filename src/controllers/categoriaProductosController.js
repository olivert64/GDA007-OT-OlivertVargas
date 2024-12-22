const { Model } = require('sequelize');
const categoriaProductosService = require('../services/categoriaProductosService.js');
const response = require('../utils/response.js');

class ProductosController {

    static async insert(req, res) {
        try {

            const data = req.body;

            const result = await categoriaProductosService.insertCategoriaProductos(data);
            
            response.success(res, 'Categoria producto creado Correctamente', result, 201);
            //return res.status(201).json({ message: 'Categoria producto creado Correctamente.' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar datos' });
        }

    }

    static async update(req, res) {
        try {
            const data = req.body;

            const result = await categoriaProductosService.updateCategoriaProductos(data);
            response.success(res, 'Categoria producto actualizado correctamente', result, 200);

            //return res.status(200).json({ message: 'Categoria producto actualizado correctamente' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar datos' });
        }
    }

    static async delete(req, res) {
        try {
            const idCategoriaProducto = req.params.id;

            const result = await categoriaProductosService.deleteCategoriaProductos(idCategoriaProducto);

            response.success(res, 'Categoria producto desactivado correctamente', result, 200);

            //return res.status(200).json({ message: 'Categoria producto desactivado correctamente' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al eliminar datos' });
        }
    }

    static async get(req, res) {
        try {
            const data = await categoriaProductosService.getCategoriaProductos();
            response.success(res, 'Categoria producto encontrada', data, 200);
            //return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al consultar datos' });
        }
    }

    static async getById(req, res) {
        try {
            const idCategoriaProducto = req.params.id;

            const data = await categoriaProductosService.getCategoriaProductosById(idCategoriaProducto);
            response.success(res, 'Categoria producto encontrada', data, 200);
            //return res.status(200).json(data);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al consultar datos' });
        }
    }
}

module.exports = ProductosController;