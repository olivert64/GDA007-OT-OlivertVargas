const OrdenService = require('../services/ordenService');

class OrdenController {
    
    static async insert(req, res) {
        try {

            const data = req.body;

            await OrdenService.insertOrden(data);

            return res.status(201).json({ message: 'Orden creada Correctamente.' });

        } catch (error) {
            console.error('Error al crear la orden:', error);
            return res.status(500).json({ error: 'Error al crear la orden.' });
        }
    }

    static async update(req, res) {
        try {
            const data = req.body;

            await OrdenService.updateOrden(data);

            return res.status(200).json({ message: 'Orden actualizada correctamente' });

        } catch (error) {
            console.error('Error al actualizar la orden:', error);
            return res.status(500).json({ error: 'Error al actualizar la orden.' });

        }
    }

    static async getOrdenes(req, res) {
        try {
            const ordenes = await OrdenService.getOrdenes();
            return res.status(200).json(ordenes);
        } catch (error) {
            console.error('Error al obtener las ordenes:', error);
            return res.status(500).json({ error: 'Error al obtener las ordenes.' });
        }
    }

    
}

module.exports = OrdenController;