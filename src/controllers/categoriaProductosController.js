const { Model } = require('sequelize');
const categoriaProductosService = require('../services/categoriaProductosService.js');

class ProductosController {

    static async insert(req, res) {
        try {

            const data = req.body;

            const camposRequeridos = [
                'usuario_idUsuarios',
                'nombre',
                'estados_idEstados',
            ];

            for (const campo of camposRequeridos) {
                if (!data[campo]) {
                    return res.status(400).json({ error: `El campo ${campo} es obligatorio.` });
                }
            }

            await categoriaProductosService.insertCategoriaProductos(data);
            return res.status(201).json({ message: 'Categoria producto creado Correctamente.' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar datos' });
        }

    }

    static async update(req, res) {
        try {
            const data = req.body;

            if (!data.idCategoriaProducto) {
                return res.status(400).json({ error: 'El ID de la categoria producto es obligatorio.' });
            }

            await categoriaProductosService.updateCategoriaProductos(data);

            return res.status(200).json({ message: 'Categoria producto actualizado correctamente' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar datos' });
        }
    }

    static async delete(req, res) {
        try {
            const idCategoriaProducto = req.params.idCategoriaProducto;

            if (!idCategoriaProducto) {
                return res.status(400).json({ error: 'El ID de la categoria producto es obligatorio.' });
            }

            await categoriaProductosService.deleteCategoriaProductos(idCategoriaProducto);

            return res.status(200).json({ message: 'Categoria producto desactivado correctamente' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al eliminar datos' });
        }
    }

    static async get(req, res) {
        try {
            const data = await categoriaProductosService.getCategoriaProductos();
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al consultar datos' });
        }
    }

    static async getById(req, res) {
        try {
            const idCategoriaProducto = req.params.idCategoriaProducto;

            if (!idCategoriaProducto) {
                return res.status(400).json({ error: 'El ID de la categoria producto es obligatorio.' });
            }

            const data = await categoriaProductosService.getCategoriaProductosById(idCategoriaProducto);

            return res.status(200).json(data);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al consultar datos' });
        }
    }
}

module.exports = ProductosController;