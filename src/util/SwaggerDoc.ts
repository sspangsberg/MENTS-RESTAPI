import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Swagger Demo Project',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: 'http://localhost:4000/api/',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            apiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'auth-token'
            }
        }
    }
};

const outputFile = '../util/swagger_output.json';
const endpointsFiles = ['../routes.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);