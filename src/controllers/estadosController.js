const estadosService = require('../services/estadosService.js');

class estadosController {

    static async insert(req, res) {
        try {
            const nombre = req.body;

            await estadosService.crearEstado(nombre);

            return res.status(201).json({ message: 'Estado creado Correctamente.' });

        } catch (error) {
            console.error('Error al insertar el estado:', error);
            return res.status(500).json({ error: 'Error al insertar el estado.' });
        }
    }

    static async update(req, res) {
        try {
            const data = req.body;

            await estadosService.actualizarEstado(data);

            return res.status(200).json({ message: 'Estado actualizado Correctamente.' });

        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            return res.status(500).json({ error: 'Error al actualizar el estado.' });
        }
    }

    static async get(req, res) {
        try {
            const data = await estadosService.getEstados();
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error al obtener los estados:', error);
            return res.status(500).json({ error: 'Error al obtener los estados.' });
        }
    }

    static async getById(req, res) {
        try {
            const idEstado = req.params.idEstado;

            const data = await estadosService.getbyId(idEstado);

            return res.status(200).json(data);

        } catch (error) {
            console.error('Error al obtener el estado:', error);
            return res.status(500).json({ error: 'Error al obtener el estado.' });
        }
    }

}

module.exports = estadosController;