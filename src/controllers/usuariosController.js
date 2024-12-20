const UsuariosService = require('../services/usuariosService.js');

class UsuariosController {
    
    static async insert(req, res) {
        try {

            const data = req.body;

            const camposRequeridos = [
                'rol_idRol',
                'estados_idEstados',
                'correoElectronico',
                'nombreCompleto',
                'passwrd',
                'direccion',
                'telefono',
                'fechaNacimiento',
                'Clientes_idClientes',
            ];

            for (const campo of camposRequeridos) {
                if (!data[campo]) {
                    return res.status(400).json({ error: `El campo ${campo} es obligatorio.` });
                }
            }

            await UsuariosService.insertUsuario(data);

            return res.status(201).json({ message: 'Usuario creado Correctamente.' });

        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return res.status(500).json({ error: 'Error al crear el usuario.' });
        }
    }

    // static async update(req, res) {
    //     try {
    //         const data = req.body;

    //         if (!data.idUsuarios) {
    //             return res.status(400).json({ error: 'El ID del usuario es obligatorio.' });
    //         }

    //         await UsuariosService.updateUsuario(data);

    //         return res.status(200).json({ message: 'Usuario actualizado correctamente' });

    //     } catch (error) {
    //         console.error('Error al actualizar el usuario:', error);
    //         return res.status(500).json({ error: 'Error al actualizar el usuario.' });

    //     }
    // }

}

module.exports = UsuariosController;