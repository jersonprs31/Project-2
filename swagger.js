const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Garage Tracker API',
    description: 'API to manage vehicles and maintenance logs',
  },
  host: 'localhost:8080', // Cambia esto por tu URL de Render cuando despliegues
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

// Genera swagger.json
swaggerAutogen(outputFile, routes, doc);