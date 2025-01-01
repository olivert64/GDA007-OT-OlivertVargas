const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();
const productosRoutes = require('./routes/productosRoutes.js');
const categoriaProductosRoutes = require('./routes/categoriaProductosRoutes.js');
const estadosRoutes = require('./routes/estadosRoutes.js');
const ordenRoutes = require('./routes/ordenRoutes.js');
const usuariosRoutes = require('./routes/usuariosRoutes.js');
const clientesRoutes = require('./routes/clientesRoutes.js');

const authRoutes = require('./routes/authRoutes.js');
const authenticateToken = require('./middlewares/auth.js');
const path = require('path');


const app = express();

app.use(express.json({ limit: '10mb' }));

//Prueba de conexion a la bd
sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa con la base de datos');
    })
    .catch(error => console.error('Error de conexión:', error));


//Rutas
app.get('/', (req, res) => { res.send('API funcionando') });
app.use('/api/auth', authRoutes);
app.use('/api/productos', authenticateToken, productosRoutes);
app.use('/api/categoriaProductos', authenticateToken, categoriaProductosRoutes);
app.use('/api/estados', authenticateToken, estadosRoutes);
app.use('/api/orden', authenticateToken, ordenRoutes);
app.use('/api/usuarios', authenticateToken, usuariosRoutes);
app.use('/api/clientes', authenticateToken, clientesRoutes);
app.use('/api/almacenamiento', express.static(path.join(__dirname, '../almacenamiento/imagenes')));




//Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));