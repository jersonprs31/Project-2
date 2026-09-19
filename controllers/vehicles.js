const Vehicle = require('../models/Vehicle');
const { validationResult } = require('express-validator');

// GET all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving vehicles', error: error.message });
  }
};

// GET single vehicle
exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving vehicle', error: error.message });
  }
};

// POST new vehicle
exports.createVehicle = async (req, res) => {
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add a new vehicle',
        required: true,
        schema: {
          make: "Honda",
          model: "Civic Si",
          year: 2012,
          trim: "Base",
          engineCode: "K24Z7",
          transmission: "6-speed manual",
          paintColor: "Rallye Red",
          currentMileage: 115000
        }
  } */
  
  // Validation error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const vehicle = new Vehicle(req.body);
    const savedVehicle = await vehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error: error.message });
  }
};

// PUT update vehicle
exports.updateVehicle = async (req, res) => {
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update an existing vehicle',
        required: true,
        schema: {
          make: "Honda",
          model: "Civic Si",
          year: 2012,
          trim: "Base",
          engineCode: "K24Z7",
          transmission: "6-speed manual",
          paintColor: "Rallye Red",
          currentMileage: 116000
        }
  } */

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error: error.message });
  }
};

// DELETE vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
  }
};