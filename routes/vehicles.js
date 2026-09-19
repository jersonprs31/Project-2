const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles');
const { body } = require('express-validator');

// Reglas de validación requeridas por la rúbrica
const vehicleValidationRules = [
  body('make').notEmpty().withMessage('Make is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('year').isInt({ min: 1886 }).withMessage('Year must be a valid number'),
  body('currentMileage').isNumeric().withMessage('Mileage must be a number')
];

router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicle);
router.post('/', vehicleValidationRules, vehicleController.createVehicle);
router.put('/:id', vehicleValidationRules, vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;