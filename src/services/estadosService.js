const sequelize = require('../config/database.js');


class estadosService{

    static async crearEstado(data) {
        const query = `EXEC p_insertarEstado @nombre = :nombre;`;
        return await sequelize.query(query, {
            replacements: { 
                nombre: data.nombre
            },
            type: sequelize.QueryTypes.INSERT
        });
    }

    static async actualizarEstado(data) {
        const query = `EXEC p_editarEstados @idEstado = :idEstado, @nombre = :nombre;`;
        return await sequelize.query(query, {
            replacements: { 
                idEstado: data.idEstado,
                nombre: data.nombre
            },
            type: sequelize.QueryTypes.UPDATE
        });
    }

    static async getEstados() {
        const query = `EXEC p_obtenerEstados`;
        return await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
    }

    static async getbyId(id) {
        const query = `EXEC p_obtenerEstadosPorId @idEstado = :idEstado`;
        return await sequelize.query(query, {
            replacements: { idEstado: id },
            type: sequelize.QueryTypes.SELECT
        });
    }

}

module.exports = estadosService;