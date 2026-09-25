const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles');
const { body } = require('express-validator');
const { isAuthenticated } = require('../middleware/authenticate');

const vehicleValidationRules = [
  body('make').notEmpty().withMessage('Make is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('year').isInt({ min: 1886 }).withMessage('Year must be a valid number'),
  body('currentMileage').isNumeric().withMessage('Mileage must be a number')
];

router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicle);
router.post('/', isAuthenticated, vehicleValidationRules, vehicleController.createVehicle);
router.put('/:id', isAuthenticated, vehicleValidationRules, vehicleController.updateVehicle);
router.delete('/:id', isAuthenticated, vehicleController.deleteVehicle);

module.exports = router;