const OrdenService = require('../services/ordenService');
const response = require('../utils/response.js');

class OrdenController {
    
    static async insert(req, res) {
        console.log(req.user);
        try {

            const data = req.body;

            const result = await OrdenService.insertOrden(data);
            response.success(res, 'Orden creada Correctamente', result, 201);
            //return res.status(201).json({ message: 'Orden creada Correctamente.' });

        } catch (error) {
            console.error('Error al crear la orden:', error);
            return res.status(500).json({ error: 'Error al crear la orden.' });
        }
    }

    static async update(req, res) {
        try {
            const data = req.body;

            const result = await OrdenService.updateOrden(data);
            response.success(res, 'Orden actualizada Correctamente', result, 200);
            //return res.status(200).json({ message: 'Orden actualizada correctamente' });

        } catch (error) {
            console.error('Error al actualizar la orden:', error);
            return res.status(500).json({ error: 'Error al actualizar la orden.' });

        }
    }

    static async getOrdenes(req, res) {
        try {
            const ordenes = await OrdenService.getOrdenes();
            response.success(res, 'Ordenes encontradas', ordenes, 200);
            //return res.status(200).json(ordenes);
        } catch (error) {
            console.error('Error al obtener las ordenes:', error);
            return res.status(500).json({ error: 'Error al obtener las ordenes.' });
        }
    }

    
}

module.exports = OrdenController;