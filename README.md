# Doctor Listing Application

A web application built with Next.js (frontend) and Express.js (backend) using MongoDB as a NoSQL database. This project allows patients to view a filtered list of doctors, book appointments, and provides an admin interface to manage doctors (add/delete) and view appointments. The design is inspired by `https://www.apollo247.com/specialities/general-physician-internal-medicine`.

## Features
- **Patient View**:
  - View a list of doctors with filters by specialty (e.g., General Physician, Internal Medicine) and pagination.
  - Book appointments with doctors by providing patient name, date, and time.
- **Admin View**:
  - Log in to add or delete doctors.
  - View a list of appointments made by patients.
- **Role-Based Access**: Basic admin authentication to restrict management features.
- **SEO Optimization**: Built with Next.js for off-page SEO support (customizable via meta tags).
- **Responsive Design**: Grid layout for doctor listings and appointment displays.

## Prerequisites
- **Node.js** (v14.x or later)
- **MongoDB** (local instance or MongoDB Atlas)
- **npm** (comes with Node.js)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/doctor-listing.git
cd doctor-listing
```
## Depnedencies
```
npm install express mongoose dotenv axios cors
```
## Start The Project
### Frontend
```
npm run dev
```
### Backend
--Note: Take another Terminal
```
cd server
node server.js
```
## Usage
### Patient View
URL: http://localhost:3000
Doctor Listing:
Use the dropdown to filter doctors by specialty.
Use "Previous" and "Next" buttons to paginate through the list.
Booking Appointments:
Click "Book Appointment" on a doctor card.
Fill out the modal form with your name, preferred date, and time.
Submit to book the appointment (a success message will appear).
Admin Access
Login:
```
Go to http://localhost:3000/login.
```
Log in with:
```
Username: admin
Password: admin123
```
```
You’ll be redirected to http://localhost:3000/admin.
```
Manage Doctors:
Add Doctor: Fill out the form and click "Add Doctor".
Delete Doctor: Click the "Delete" button on a doctor card.
View Appointments:
Scroll to the "Appointments" section to see all bookings made by patients.
Logout:
Click the "Logout" button to return to the login page.
