import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    time: '',
  });
  const [message, setMessage] = useState('');

  const fetchDoctors = async () => {
    const response = await axios.get('http://localhost:5000/api/list-doctors', {
      params: { specialty, page, limit },
    });
    setDoctors(response.data.doctors);
    setTotal(response.data.total);
  };

  useEffect(() => {
    fetchDoctors();
  }, [specialty, page]);

  const handleFilterChange = (e) => {
    setSpecialty(e.target.value);
    setPage(1);
  };

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
    setFormData({ patientName: '', date: '', time: '' });
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/book-appointment', {
        doctorId: selectedDoctor._id,
        patientName: formData.patientName,
        date: formData.date,
        time: formData.time,
      });
      setMessage('Appointment booked successfully!');
      setTimeout(closeModal, 2000); 
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="container">
      <h1>Doctor Listing</h1>
      <div className="admin-login-link">
        <Link href="/login">
          <button>Admin Login</button>
        </Link>
      </div>
      <div className="filters">
        <label>Specialty: </label>
        <select value={specialty} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="general-physician">General Physician</option>
          <option value="internal-medicine">Internal Medicine</option>
        </select>
      </div>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p>Specialty: {doctor.specialty}</p>
            <p>Location: {doctor.location}</p>
            <button className="book-button" onClick={() => openModal(doctor)}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page} of {Math.ceil(total / limit)}</span>
        <button disabled={page === Math.ceil(total / limit)} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      {/* Modal for Booking */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Book Appointment with {selectedDoctor?.name}</h2>
            {message && <p className={message.includes('Error') ? 'message error' : 'message'}>{message}</p>}
            <form onSubmit={handleBookAppointment} className="booking-form">
              <div className="form-group">
                <label>Patient Name: </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                  required
                />
              </div>
              <div className="form-group">
                <label>Time: </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}