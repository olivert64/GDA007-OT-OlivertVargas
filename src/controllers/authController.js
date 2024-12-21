const UsuariosService = require('../services/usuariosService.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class authController {

    static async login(req, res) {
        const { correoElectronico, passwrd } = req.body;

        try {
    
            const user = await UsuariosService.getUsuarioByEmail(correoElectronico);
            if (!user) {
                console.log('Usuario no encontrado');
                return res.status(400).json({ error: 'Usuario no encontrado' });
            }
    
            const passwordValida = await bcrypt.compare(passwrd, user.passwrd);
            if (!passwordValida) {
                return res.status(400).json({ error: 'Invalid password' });
            }
    
            //para que el token dure 24h
            const token = jwt.sign({ id: user.idUsuario }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ token });
        } catch (error) {
            console.error('Internal server error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = authController;