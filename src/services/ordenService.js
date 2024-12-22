const sequelize = require('../config/database.js'); 

class OrdenService {

    static async insertOrden(data) {
        const query = `EXEC p_CrearOrdenConDetalle
            @usuarios_idUsuarios = :usuarios_idUsuarios,
            @detalles = :detalles;`;

        return await sequelize.query(query, {
            replacements: {
                usuarios_idUsuarios: data.usuarios_idUsuarios,
                detalles: JSON.stringify(data.detalles),
            },
            type: sequelize.QueryTypes.INSERT
        });
    }

    static async updateOrden(data) {
        const query = `EXEC p_editarOrden
            @idOrden = :idOrden,
            @estados_idEstados = :estados_idEstados,
            @nombreCompleto = :nombreCompleto,
            @direccion = :direccion,
            @telefono = :telefono,
            @correoElectronico = :correoElectronico,
            @fechaEntregaEstimada = :fechaEntregaEstimada,
            @fechaEntregado = :fechaEntregado`;

        return await sequelize.query(query, {
            replacements: {
                idOrden: data.idOrden,
                estados_idEstados: data.estados_idEstados,
                nombreCompleto: data.nombreCompleto,
                direccion: data.direccion,
                telefono: data.telefono,
                correoElectronico: data.correoElectronico,
                fechaEntregaEstimada: data.fechaEntregaEstimada,
                fechaEntregado: data.fechaEntregado,
            },
            type: sequelize.QueryTypes.UPDATE
        });
    }

    static async getOrdenes() {
        const query = `EXEC p_obtenerOrdenes;`;
        return await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
    }

}

module.exports = OrdenService;