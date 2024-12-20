const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();
const productosRoutes = require('./routes/productosRoutes.js');
const categoriaProductosRoutes = require('./routes/categoriaProductosRoutes.js');
const estadosRoutes = require('./routes/estadosRoutes.js');
const ordenRoutes = require('./routes/ordenRoutes.js');
const usuariosRoutes = require('./routes/usuariosRoutes.js');
const clientesRoutes = require('./routes/clientesRoutes.js');


const app = express();

app.use(express.json());

//Prueba de conexion a la bd
sequelize.authenticate()
    .then(() => console.log('Conexión exitosa con la base de datos'))
    .catch(error => console.error('Error de conexión:', error));


//Rutas
app.get('/', (req, res) => {res.send('API funcionando')});
app.use('/api/productos', productosRoutes);
app.use('/api/categoriaProductos', categoriaProductosRoutes);
app.use('/api/estados', estadosRoutes);
app.use('/api/orden', ordenRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clientes', clientesRoutes);




//Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));