const MaintenanceLog = require('../models/MaintenanceLog');
const { validationResult } = require('express-validator');

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await MaintenanceLog.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving logs', error: error.message });
  }
};

exports.getLog = async (req, res) => {
  try {
    const log = await MaintenanceLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving log', error: error.message });
  }
};

exports.createLog = async (req, res) => {
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add a new maintenance log',
        required: true,
        schema: {
          vehicleId: "PEGAR_ID_DEL_VEHICULO_AQUI",
          serviceType: "Oil Change",
          partsUsed: ["Motul 8100 Eco-lite 5W-30", "OEM Filter"],
          notes: "Regular 5k mile service"
        }
  } */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const log = new MaintenanceLog(req.body);
    const savedLog = await log.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating log', error: error.message });
  }
};

exports.updateLog = async (req, res) => {
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update a maintenance log',
        required: true,
        schema: {
          vehicleId: "Enter_ID",
          serviceType: "Paint Correction",
          partsUsed: ["Compound", "Polish", "Ceramic Coating"],
          notes: "Full body correction"
        }
  } */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedLog = await MaintenanceLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLog) return res.status(404).json({ message: 'Log not found' });
    res.status(200).json(updatedLog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating log', error: error.message });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const deletedLog = await MaintenanceLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ message: 'Log not found' });
    res.status(200).json({ message: 'Log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting log', error: error.message });
  }
};