const express = require('express');
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.status(200).json({ message: 'Login successful', role: 'admin' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/add-doctor', async (req, res) => {
  try {
    const { name, specialty, location } = req.body;
    if (!name || !specialty || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const doctor = new Doctor({ name, specialty, location });
    await doctor.save();
    res.status(201).json({ message: 'Doctor added', doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding doctor' });
  }
});

app.get('/api/list-doctors', async (req, res) => {
  try {
    const { specialty, page = 1, limit = 10 } = req.query;
    const query = specialty ? { specialty } : {};
    const skip = (page - 1) * limit;

    const doctors = await Doctor.find(query)
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Doctor.countDocuments(query);

    res.status(200).json({ doctors, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching doctors' });
  }
});

app.delete('/api/delete-doctor/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    // Delete associated appointments
    await Appointment.deleteMany({ doctorId: id });
    res.status(200).json({ message: 'Doctor deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting doctor' });
  }
});

app.post('/api/book-appointment', async (req, res) => {
  try {
    const { doctorId, patientName, date, time } = req.body;
    if (!doctorId || !patientName || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const appointment = new Appointment({ doctorId, patientName, date, time });
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error booking appointment' });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId', 'name specialty');
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));