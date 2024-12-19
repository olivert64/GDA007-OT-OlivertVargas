const OrdenService = require('../services/ordenService');

class OrdenController {
    
    static async insert(req, res) {
        try {

            const data = req.body;

            const camposRequeridos = [
                'usuarios_idusuarios',
                'detalles',
            ];

            for (const campo of camposRequeridos) {
                if (!data[campo]) {
                    return res.status(400).json({ error: `El campo ${campo} es obligatorio.` });
                }
            }

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

            if (!data.idOrden) {
                return res.status(400).json({ error: 'El ID de la orden es obligatorio.' });
            }

            await OrdenService.updateOrden(data);

            return res.status(200).json({ message: 'Orden actualizada correctamente' });

        } catch (error) {
            console.error('Error al actualizar la orden:', error);
            return res.status(500).json({ error: 'Error al actualizar la orden.' });

        }
    }

    
}

module.exports = OrdenController;