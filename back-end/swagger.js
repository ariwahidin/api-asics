const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PYID API Documentation',
            version: '1.0.0',
            description: 'Documentation for APIs in PYID TMS with JWT authentication',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./swagger/v1/*.swagger.js'], // Path ke file anotasi Swagger
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    // Route to serve the Swagger docs
    app.use('/py-asics/api-docs', (req, res, next) => {
        const host = req.get('host');
        let protocol = req.secure ? 'https' : 'http'; // Mendapatkan protokol yang benar
        if(host == 'yusen-id.com'){
            protocol = 'https';
        }
        const swaggerSpec = {
            ...specs,
            servers: [
                {
                    url: `${protocol}://${host}/py-asics/api`,
                    description: 'Dynamic server',
                },
            ],
        };
        req.swaggerDoc = swaggerSpec;
        next();
    }, swaggerUi.serve, swaggerUi.setup((req) => req.swaggerDoc));
};
