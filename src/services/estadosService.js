const sequelize = require('../config/database.js');


class estadosService{

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