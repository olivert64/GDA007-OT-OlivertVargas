const { Model } = require("sequelize");

const response = {
    success: (res, message, data = null, statusCode = 200) => {
        res.status(statusCode).json({
            status: 'success',
            message: message,
            data: data,
            statusCode: statusCode
        });
    },

    error: (res, error, statusCode = 400) => {
        res.status(statusCode).json({
            status: 'error',
            error: error.message || 'Internal Server Error',
            details: error.details || null,
            statusCode: statusCode
        });
    }
}

module.exports = response;