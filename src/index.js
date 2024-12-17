const express  = require('express');
const sequelize = require('./config/database');
require('dotenv').config();


const app = express();
app.use(express.json());

//Prueba de conexion a la bd
sequelize.authenticate()
    .then(() => console.log('Conexión exitosa con la base de datos'))
    .catch(err => console.error('Error de conexión:', err));

//Rutas
app.get('/', (req, res) => res.send('API funcionando'));

//Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));