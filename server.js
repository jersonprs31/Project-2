const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 
const vehicleRoutes = require('./routes/vehicles');
const maintenanceRoutes = require('./routes/maintenance'); 

dotenv.config();

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Rutas
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/maintenancelogs', maintenanceRoutes); 


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});