const sequelize = require('../config/database.js'); 

class OrdenService {

    static async insertOrden(data) {
        const query = `EXEC p_CrearOrdenConDetalle
            @usuarios_idusuarios = :usuarios_idusuarios,
            @detalles = :detalles;`;

        return await sequelize.query(query, {
            replacements: {
                usuarios_idusuarios: data.usuarios_idusuarios,
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

}

module.exports = OrdenService;