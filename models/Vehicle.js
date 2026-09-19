const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  trim: { type: String },
  engineCode: { type: String },
  transmission: { type: String },
  paintColor: { type: String }, 
  currentMileage: { type: Number, required: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);