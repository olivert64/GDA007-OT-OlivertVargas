const ClientesService = require('../services/clientesService.js');


class ClientesController {

    static async insert(req, res) {
        try {

            const data = req.body;

            const camposRequeridos = [
                'razonSocial',
                'nombreComercial',
                'direccionEntrega',
                'telefono',
                'email',
                'estados_idEstados'
            ];

            for (const campo of camposRequeridos) {
                if (!data[campo]) {
                    return res.status(400).json({ error: `El campo ${campo} es obligatorio.` });
                }
            }

            await ClientesService.insertCliente(data);

            return res.status(201).json({ message: 'Cliente creado Correctamente.' });

        } catch (error) {
            console.error('Error al crear el cliente:', error);
            return res.status(500).json({ error: 'Error al crear el cliente.' });
        }
    }

    static async get(req, res) {
        try {
            const clientes = await ClientesService.obtenerClientes();
            return res.status(200).json(clientes);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
            return res.status(500).json({ error: 'Error al obtener los clientes.' });
        }
    }

    static async getById(req, res) { 
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({ error: 'El ID del cliente es obligatorio.' });
            }

            const cliente = await ClientesService.obtenerClienteId(id);
            return res.status(200).json(cliente);
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
            return res.status(500).json({ error: 'Error al obtener el cliente.' });
        }
    }


}


module.exports = ClientesController;