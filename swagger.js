const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Garage Tracker API',
    description: 'API to manage vehicles and maintenance logs',
  },
  host: 'garage-tracker-api.onrender.com',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);