const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenance');
const { body } = require('express-validator');
const { isAuthenticated } = require('../middleware/authenticate');

const logValidationRules = [
  body('vehicleId').notEmpty().withMessage('Vehicle ID is required'),
  body('serviceType').notEmpty().withMessage('Service Type is required')
];

router.get('/', maintenanceController.getAllLogs);
router.get('/:id', maintenanceController.getLog);
router.post('/', isAuthenticated, logValidationRules, maintenanceController.createLog);
router.put('/:id', isAuthenticated, logValidationRules, maintenanceController.updateLog);
router.delete('/:id', isAuthenticated, maintenanceController.deleteLog);

module.exports = router;