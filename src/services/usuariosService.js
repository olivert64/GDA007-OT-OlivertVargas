const sequelize = require('../config/database.js');
const bcrypt = require('bcrypt');

class UsuariosService {

    static async insertUsuario(data) {
        const hashedPassword = await bcrypt.hash(data.passwrd, 10);

        const query = `EXEC p_insertarUsuarios
            @rol_idRol = :rol_idRol,
	        @correoElectronico = :correoElectronico,
	        @nombreCompleto = :nombreCompleto,
	        @passwrd = :passwrd,
	        @direccion = :direccion,
	        @telefono = :telefono,
	        @fechaNacimiento = :fechaNacimiento,
	        @Clientes_idClientes = :Clientes_idClientes;`;

        return await sequelize.query(query, {
            replacements: {
                rol_idRol: data.rol_idRol,
                correoElectronico: data.correoElectronico,
                nombreCompleto: data.nombreCompleto,
                passwrd: hashedPassword,
                direccion: data.direccion,
                telefono: data.telefono,
                fechaNacimiento: data.fechaNacimiento,
                Clientes_idClientes: data.Clientes_idClientes,
            },
            type: sequelize.QueryTypes.INSERT
        });
    }

    static async updateUsuario(data) {
        const query = `EXEC p_editarUsuarios
            @idUsuario = :idUsuario,
            @rol_idRol = :rol_idRol,
            @estados_idEstados = :estados_idEstados,
            @correoElectronico = :correoElectronico,
            @nombreCompleto = :nombreCompleto,
            @passwrd = :passwrd,
            @direccion = :direccion,
            @telefono = :telefono,
            @fechaNacimiento = :fechaNacimiento,
            @Clientes_idClientes = :Clientes_idClientes;`;

        return await sequelize.query(query, {
            replacements: {
                idUsuario: data.idUsuario,
                rol_idRol: data.rol_idRol,
                estados_idEstados: data.estados_idEstados,
                correoElectronico: data.correoElectronico,
                nombreCompleto: data.nombreCompleto,
                passwrd: data.passwrd,
                direccion: data.direccion,
                telefono: data.telefono,
                fechaNacimiento: data.fechaNacimiento,
                Clientes_idClientes: data.Clientes_idClientes,
            },
            type: sequelize.QueryTypes.UPDATE
        });
    }

    static async deleteUsuario(idUsuario) {
        const query = `EXEC p_eliminarUsuarios @idUsuario = :idUsuario;`;
        return await sequelize.query(query, {     
            replacements: { 
                idUsuario: idUsuario 
            },
            type: sequelize.QueryTypes.UPDATE
        });
    }

    static async getUsuarios() {
        const query = `EXEC p_obtenerUsuarios;`;
        return await sequelize.query(query, { 
            type: sequelize.QueryTypes.SELECT 
        });
    }

    static async getUsuarioId(idUsuario) {
        const query = `EXEC p_obtenerUsuarioPorId @idUsuario = :idUsuario;`;
        return await sequelize.query(query, {
            replacements: { 
                idUsuario: idUsuario 
            },
            type: sequelize.QueryTypes.SELECT
        });
    }

}

module.exports = UsuariosService;