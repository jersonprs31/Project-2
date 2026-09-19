const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenance');
const { body } = require('express-validator');

const logValidationRules = [
  body('vehicleId').notEmpty().withMessage('Vehicle ID is required'),
  body('serviceType').notEmpty().withMessage('Service Type is required')
];

router.get('/', maintenanceController.getAllLogs);
router.get('/:id', maintenanceController.getLog);
router.post('/', logValidationRules, maintenanceController.createLog);
router.put('/:id', logValidationRules, maintenanceController.updateLog);
router.delete('/:id', maintenanceController.deleteLog);

module.exports = router;