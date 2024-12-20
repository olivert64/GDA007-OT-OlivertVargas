const sequelize = require('../config/database.js');

class UsuariosService {

    static async insertUsuario(data) {
        const query = `EXEC p_insertarUsuarios
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
                rol_idRol: data.rol_idRol,
                estados_idEstados: data.estados_idEstados,
                nombreCompleto: data.nombreCompleto,
                passwrd: data.passwrd,
                direccion: data.direccion,
                telefono: data.telefono,
                fechaNacimiento: data.fechaNacimiento,
                Clientes_idClientes: data.Clientes_idClientes,
            },
            type: sequelize.QueryTypes.INSERT
        });
    }

    // static async updateUsuario(data) {
    //     const query = `EXEC p_editarUsuario
    //         @idUsuarios = :idUsuarios,
    //         @nombre = :nombre,
    //         @apellido = :apellido,
    //         @correoElectronico = :correoElectronico,
    //         @telefono = :telefono,
    //         @direccion = :direccion,
    //         @contrasena = :contrasena;`;

    //     return await sequelize.query(query, {
    //         replacements: {
    //             idUsuarios: data.idUsuarios,
    //             nombre: data.nombre,
    //             apellido: data.apellido,
    //             correoElectronico: data.correoElectronico,
    //             telefono: data.telefono,
    //             direccion: data.direccion,
    //             contrasena: data.contrasena,
    //         },
    //         type: sequelize.QueryTypes.UPDATE
    //     });
    // }

}

module.exports = UsuariosService;