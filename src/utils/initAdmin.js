const bcrypt = require('bcrypt');
const UsuariosService = require('../services/usuariosService.js');
require('dotenv').config();

const createAdminUser = async () => {
    const rol_idRol = 1;
    const correoElectronico = 'admin@admin.com';
    const nombreCompleto = 'Administrador';
    const passwrd = 'adminpassword';
    const direccion = 'admin';
    const telefono = 'admin';
    const fechaNacimiento = '1985-06-14';
    const Clientes_idClientes = null;

    try {
        const existingAdmin = await UsuariosService.getUsuarioByEmail(correoElectronico);
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        const adminData = {
            rol_idRol: rol_idRol,
            correoElectronico: correoElectronico,
            nombreCompleto: nombreCompleto,
            passwrd: passwrd,
            direccion: direccion,
            telefono: telefono,  
            fechaNacimiento: fechaNacimiento,
            Clientes_idClientes: Clientes_idClientes
        };

        await UsuariosService.insertUsuario(adminData);
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

createAdminUser();


module.exports = createAdminUser;
