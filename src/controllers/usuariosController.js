const UsuariosService = require('../services/usuariosService.js');
const response = require('../utils/response.js');

class UsuariosController {
    
    static async insert(req, res) {
        try {

            const data = req.body;

            const result = await UsuariosService.insertUsuario(data);
            response.success(res, 'Usuario creado Correctamente', result, 201);

            //return res.status(201).json({ message: 'Usuario creado Correctamente.' });

        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return res.status(500).json({ error: 'Error al crear el usuario.' });
        }
    }

    static async update(req, res) {
        try {
            const data = req.body;

            const result = await UsuariosService.updateUsuario(data);
            response.success(res, 'Usuario actualizado Correctamente', result, 200);
            //return res.status(200).json({ message: 'El Usuario fue actualizado correctamente.' });
        } catch (error) {
            console.error('Error al actualizar el usuario: ', error);
            return res.status(500).json({ error: 'Error al actualizar el usuario. ' });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            const result = await UsuariosService.deleteUsuario(id);
            response.success(res, 'Usuario eliminado Correctamente', result, 200);  
            //return res.status(200).json({ message: 'El Usuario fue eliminado correctamente.' });
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            return res.status(500).json({ error: 'Error al eliminar el usuario.' });
        }
    }

    static async get(req, res) {
        try {
            const usuarios = await UsuariosService.getUsuarios();
            response.success(res, 'Usuarios encontrados', usuarios, 200);
            //return res.status(200).json(usuarios);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            return res.status(500).json({ error: 'Error al obtener los usuarios.' });
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id;
            const usuario = await UsuariosService.getUsuarioId(id);
            response.success(res, 'Usuario encontrado', usuario, 200);
            //return res.status(200).json(usuario);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return res.status(500).json({ error: 'Error al obtener el usuario.' });
        }
    }
    

}

module.exports = UsuariosController;