
const sequelize = require('../config/database.js');


class CategoriaProductosService {

    static async insertCategoriaProductos(data) {
        const query = `EXEC p_insertarCategoriaProductos
            @usuario_idUsuarios = :usuario_idUsuarios,
            @nombre = :nombre;`;

        return await sequelize.query(query, {
            replacements: {
                usuario_idUsuarios: data.usuario_idUsuarios,
                nombre: data.nombre,
            },
            type: sequelize.QueryTypes.INSERT
        });

    }

    static async updateCategoriaProductos(data) {
        const query =
            `EXEC p_editarCategoriaProductos
                @idCategoriaProducto = :idCategoriaProducto,
                @usuario_idUsuarios = :usuario_idUsuarios,
                @nombre = :nombre,
                @estados_idEstados = :estados_idEstados`;

        return await sequelize.query(query, {
            replacements: {
                idCategoriaProducto: data.idCategoriaProducto,
                usuario_idUsuarios: data.usuario_idUsuarios,
                nombre: data.nombre,
                estados_idEstados: data.estados_idEstados,
            },
            type: sequelize.QueryTypes.UPDATE
        });

    }

    static async deleteCategoriaProductos(id) {
        const query = `EXEC p_eliminarCategoriaProductos @idCategoriaProducto = :idCategoriaProducto`;
        return await sequelize.query(query, {
            replacements: { idCategoriaProducto: id },
            type: sequelize.QueryTypes.UPDATE
        });

    }

    static async getCategoriaProductos() {
        const query = `EXEC p_obtenerCategoriaProductos`;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

    static async getCategoriaProductosById(id) {
        const query = `EXEC p_obtenerCategoriaPorId @idCategoriaProducto = :idCategoriaProducto`;
        return await sequelize.query(query, {
            replacements: { idCategoriaProducto: id },
            type: sequelize.QueryTypes.SELECT
        });
    }

}

module.exports = CategoriaProductosService;