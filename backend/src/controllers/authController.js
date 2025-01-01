const UsuariosService = require('../services/usuariosService.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const response = require('../utils/response.js');
const roles = require('../utils/constantes/roles.js');

class authController {

    static async login(req, res) {
        const { correoElectronico, passwrd} = req.body;

        try {

            const user = await UsuariosService.getUsuarioByEmail(correoElectronico);

            console.log(user.rol_idRol);

            if (!user) {
                console.log('Usuario no encontrado');
                return res.status(400).json({ error: 'Usuario no encontrado' });
            }

            const passwordValida = await bcrypt.compare(passwrd, user.passwrd);
            if (!passwordValida) {
                return res.status(400).json({ error: 'Invalid password' });
            }

            //validar que el usuario sea admin      
            if (user.rol_idRol != roles.ADMIN) {
                return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
            }

            //para que el token dure 24h
            const token = jwt.sign({ id: user.idUsuario, rol: user.rol_idRol }, process.env.JWT_SECRET, { expiresIn: '24h' });
            response.success(res, 'Login correcto', { token }, 200);
            //res.json({ token });
        } catch (error) {
            console.error('Internal server error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = authController;