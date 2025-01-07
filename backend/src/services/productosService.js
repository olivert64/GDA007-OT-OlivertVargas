const sequelize = require('../config/database.js');
const imageService = require('./almacenamientoService.js');


class ProductosService {

    //insertar productos
    static async insertProductos(data) {

        const imageUrl = await imageService.saveBase64Image(data.fotoBase64);

        const query = `EXEC p_insertarProductos
            @CategoriaProductos_idCategoriaProductos = :CategoriaProductos_idCategoriaProductos,
            @usuarios_idUsuarios = :usuarios_idUsuarios,
            @nombre = :nombre,
            @marca = :marca,
            @codigo = :codigo,
            @cantidad = :cantidad,
            @precio = :precio,
            @fotoUrl = :fotoUrl`;

        return await sequelize.query(query, {
            replacements: {
                CategoriaProductos_idCategoriaProductos: data.CategoriaProductos_idCategoriaProductos,
                usuarios_idUsuarios: data.usuarios_idUsuarios,
                nombre: data.nombre,
                marca: data.marca,
                codigo: data.codigo,
                cantidad: data.cantidad,
                precio: data.precio,
                fotoUrl: imageUrl || null,
            },
            type: sequelize.QueryTypes.INSERT
        });

    }

    //actualizar productos
    static async updateProductos(data) {
        const query =
            `EXEC p_editarProductos
                @idProducto = :idProducto,
                @CategoriaProductos_idCategoriaProductos = :CategoriaProductos_idCategoriaProductos,
                @usuarios_idUsuarios = :usuarios_idUsuarios,
                @nombre = :nombre,
                @marca = :marca,
                @codigo = :codigo,
                @cantidad = :cantidad,
                @estados_idEstados = :estados_idEstados,
                @precio = :precio,
                @fotoUrl = :fotoUrl`;

        return await sequelize.query(query, {
            replacements: {
                idProducto: data.idProducto,
                CategoriaProductos_idCategoriaProductos: data.CategoriaProductos_idCategoriaProductos,
                usuarios_idUsuarios: data.usuarios_idUsuarios,
                nombre: data.nombre,
                marca: data.marca,
                codigo: data.codigo,
                cantidad: data.cantidad,
                estados_idEstados: data.estados_idEstados,
                precio: data.precio,
                fotoUrl: data.fotoUrl,
            },
            type: sequelize.QueryTypes.UPDATE,
        });
    }

    //desactivar productos
    static async deleteProductos(id) {
        const query = `EXEC p_eliminarProductos @idProducto = :idProducto`;
        return await sequelize.query(query, {
            replacements: { idProducto: id },
            type: sequelize.QueryTypes.UPDATE
        });

    }

    //obtener lista de productos
    static async obtenerProductos() {
        const query = 'EXEC p_obtenerProductos;';
        return await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
    }

    static async obtenerProductoId(id) {
        const query = 'EXEC p_ObtenerProductoPorId @idProducto = :idProducto';
        return await sequelize.query(query, {
            replacements: { idProducto: id },
            type: sequelize.QueryTypes.SELECT,
        });

    }

}

module.exports = ProductosService;
