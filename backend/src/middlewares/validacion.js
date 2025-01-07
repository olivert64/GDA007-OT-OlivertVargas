const { validationResult } = require('express-validator');

// Middleware para validar campos
const validarCampos = validations => {
    return async (req, res, next) => {
        // procesamiento secuencial, detiene la ejecución de la cadena de validaciones si una falla.
        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
        }
        next();
    };
};


module.exports = validarCampos;
