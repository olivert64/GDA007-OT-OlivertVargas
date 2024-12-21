const ClientesService = require('../services/clientesService.js');


class ClientesController {

    static async insert(req, res) {
        try {

            const data = req.body;

            await ClientesService.insertCliente(data);

            return res.status(201).json({ message: 'Cliente creado Correctamente.' });

        } catch (error) {
            console.error('Error al crear el cliente:', error);
            return res.status(500).json({ error: 'Error al crear el cliente.' });
        }
    }

    static async update(req, res) {
        try {

            const data = req.body;


            await ClientesService.updateCliente(data);

            return res.status(200).json({ message: 'Cliente actualizado Correctamente.' });

        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            return res.status(500).json({ error: 'Error al actualizar el cliente.' });
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

    static async delete(req, res) { 
        try {
            const id = req.params.id;

            await ClientesService.deleteCliente(id);
            return res.status(200).json({ message: 'Cliente eliminado Correctamente.' });

        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
            return res.status(500).json({ error: 'Error al eliminar el cliente.' });
        }
    }

    static async getById(req, res) { 
        try {
            const id = req.params.id;

            const cliente = await ClientesService.obtenerClienteId(id);

            return res.status(200).json(cliente);
            
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
            return res.status(500).json({ error: 'Error al obtener el cliente.' });
        }
    }


}


module.exports = ClientesController;