const mongoose = require('mongoose');

const maintenanceLogSchema = new mongoose.Schema({
  vehicleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vehicle', 
    required: true 
  },
  serviceDate: { type: Date, required: true, default: Date.now },
  serviceType: { type: String, required: true }, 
  partsUsed: { type: [String] }, 
  notes: { type: String }
});

module.exports = mongoose.model('MaintenanceLog', maintenanceLogSchema);