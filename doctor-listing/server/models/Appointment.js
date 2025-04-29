// server/models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientName: { type: String, required: true },
  date: { type: String, required: true }, 
  time: { type: String, required: true }, 
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);