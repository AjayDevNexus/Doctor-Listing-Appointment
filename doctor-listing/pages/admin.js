import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from './_app';
import Link from 'next/link';

export default function Admin() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ name: '', specialty: '', location: '' });
  const [message, setMessage] = useState('');
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
    }
  }, [user, router]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/list-doctors', {
        params: { page: 1, limit: 100 },
      });
      setDoctors(response.data.doctors);
    } catch (error) {
      setMessage('Error fetching doctors');
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      setMessage('Error fetching appointments');
    }
  };

  useEffect(() => {
    if (user) {
      fetchDoctors();
      fetchAppointments();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/add-doctor', formData);
      setMessage('Doctor added successfully!');
      setFormData({ name: '', specialty: '', location: '' });
      fetchDoctors();
    } catch (error) {
      setMessage('Error adding doctor: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-doctor/${id}`);
      setMessage('Doctor deleted successfully!');
      fetchDoctors();
      fetchAppointments(); // Refresh appointments as they may be affected
    } catch (error) {
      setMessage('Error deleting doctor: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="admin-actions">
        <Link href="/">
          <button className="back-button">Back to Doctor Listing</button>
        </Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      {message && <p className={message.includes('Error') ? 'message error' : 'message'}>{message}</p>}
      <h2>Add Doctor</h2>
      <form onSubmit={handleAdd} className="add-doctor-form">
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Specialty: </label>
          <select name="specialty" value={formData.specialty} onChange={handleChange} required>
            <option value="">Select Specialty</option>
            <option value="general-physician">General Physician</option>
            <option value="internal-medicine">Internal Medicine</option>
          </select>
        </div>
        <div className="form-group">
          <label>Location: </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Doctor</button>
      </form>
      <h2>Manage Doctors</h2>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p>Specialty: {doctor.specialty}</p>
            <p>Location: {doctor.location}</p>
            <button onClick={() => handleDelete(doctor._id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
      <h2>Appointments</h2>
      <div className="appointment-list">
        {appointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          appointments.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <p><strong>Doctor:</strong> {appt.doctorId?.name || 'Unknown'}</p>
              <p><strong>Specialty:</strong> {appt.doctorId?.specialty || 'N/A'}</p>
              <p><strong>Patient:</strong> {appt.patientName}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Status:</strong> {appt.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}