const estadosService = require('../services/estadosService.js');

class estadosController {

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

            if (!idEstado) {
                return res.status(400).json({ error: 'El ID del estado es obligatorio.' });
            }

            const data = await estadosService.getbyId(idEstado);

            return res.status(200).json(data);

        } catch (error) {
            console.error('Error al obtener el estado:', error);
            return res.status(500).json({ error: 'Error al obtener el estado.' });
        }
    }

}

module.exports = estadosController;