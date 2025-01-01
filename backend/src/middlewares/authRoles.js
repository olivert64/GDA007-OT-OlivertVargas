const jwt = require('jsonwebtoken');
const rolEmun = require('../utils/constantes/roles.js');


const RoleAutorization = (...rolesPermitidos) => {
    return (req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // console.log('User idRol:', req.user.idRol); 
            // console.log('Roles permitidos:', rolesPermitidos); 

            if (!rolesPermitidos.includes(req.user.idRol)) {
                return res.status(403).json({ message: 'Acceso Denegado' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'No autorizado', error: error.message });
        }
    };
};

module.exports = RoleAutorization;