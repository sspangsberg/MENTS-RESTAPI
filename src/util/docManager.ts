import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { Application } from 'express'

export function setupDocs(app: Application) {
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Express API for JSONPlaceholder',
            version: '1.0.0',
            description:
                'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/',
                description: 'Development server',
            },
            {
                url: 'https://ments-restapi.onrender.com/api/',
                description: 'Online deployment server (render.com)',
            },
        ],

        tags: [
            {
                name: 'Product Routes',
                description: 'Routes that handles products',
            },
            {
                name: 'User Routes',
                description: 'Routes that handles users',
            },
        ],

        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                },
            },
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        imageURL: { type: 'string' },
                        price: { type: 'number' },
                        stock: { type: 'number' },
                        discount: { type: 'boolean' },
                        discountPct: { type: 'number' },
                        isHidden: { type: 'boolean' },
                        _createdBy: { type: 'string' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                        registerDate: { type: 'string' },
                    },
                },
            },
        },
    }

    const options = {
        swaggerDefinition,
        // Paths to files containing OpenAPI definitions
        apis: ['**/*.ts'],
    }

    const swaggerSpec = swaggerJSDoc(options)

    //const swaggerDocument = YAML.load("./docs/swagger.yaml");
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

