# Doctor Listing Application
A web application built with Next.js (frontend) and Express.js (backend) using MongoDB as a NoSQL database. This project allows patients to view a filtered list of doctors, book appointments, and provides an admin interface to manage doctors (add/delete) and view appointments. The design is inspired by https://www.apollo247.com/specialities/general-physician-internal-medicine.
Features

Patient View:
View a list of doctors with filters by specialty (e.g., General Physician, Internal Medicine) and pagination.
Book appointments with doctors by providing patient name, date, and time.


Admin View:
Log in to add or delete doctors.
View a list of appointments made by patients.


Role-Based Access: Basic admin authentication to restrict management features.
SEO Optimization: Built with Next.js for off-page SEO support (customizable via meta tags).
Responsive Design: Grid layout for doctor listings and appointment displays.

Prerequisites

Node.js (v14.x or later)
MongoDB (local instance or MongoDB Atlas)
npm (comes with Node.js)

Installation
1. Clone the Repository
git clone https://github.com/your-username/doctor-listing.git
cd doctor-listing

2. Install Dependencies
Install the required packages for both frontend and backend:
npm install

3. Set Up Environment Variables
Create a .env file in the root directory with the following content:
MONGO_URI=mongodb://localhost:27017/doctor-listing
PORT=5000


Replace mongodb://localhost:27017/doctor-listing with your MongoDB URI if using a remote database (e.g., MongoDB Atlas).
Ensure MongoDB is running locally (mongod) or your remote database is accessible.

4. Start the Application
Run the Backend Server
In one terminal, start the Express server:
npm run server

This starts the backend on http://localhost:5000.
Run the Frontend
In another terminal, start the Next.js development server:
npm run dev

Visit http://localhost:3000 to see the application.
Build for Production
To run in production mode:
npm run build
npm start

This builds the app and starts the production server on http://localhost:3000.
Usage
Patient View

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
Go to http://localhost:3000/login.
Log in with:
Username: admin
Password: admin123


You’ll be redirected to http://localhost:3000/admin.


Manage Doctors:
Add Doctor: Fill out the form and click "Add Doctor".
Delete Doctor: Click the "Delete" button on a doctor card.


View Appointments:
Scroll to the "Appointments" section to see all bookings made by patients.


Logout:
Click the "Logout" button to return to the login page.



Project Structure
doctor-listing/
  /pages
    index.js          # Patient-facing doctor listing and booking
    admin.js          # Admin dashboard for managing doctors and viewing appointments
    login.js          # Admin login page
    _app.js           # Custom App component for global CSS and user context
  /public
    /styles
      styles.css      # Global CSS styles
  /server
    /models
      Doctor.js       # MongoDB schema for doctors
      Appointment.js  # MongoDB schema for appointments
    server.js         # Express backend server
  package.json        # Project dependencies and scripts
  .env                # Environment variables
  README.md           # Project documentation

API Endpoints
Backend (http://localhost:5000)

POST /api/login: Admin login (username: admin, password: admin123).
POST /api/add-doctor: Add a new doctor (requires name, specialty, location).
GET /api/list-doctors: List doctors with optional filters (specialty, page, limit).
DELETE /api/delete-doctor/:id: Delete a doctor by ID.
POST /api/book-appointment: Book an appointment (requires doctorId, patientName, date, time).
GET /api/appointments: Fetch all appointments (for admin view).

Technologies Used

Frontend:
Next.js (React framework)
React (for UI components)
CSS (global styles)


Backend:
Express.js (server framework)
MongoDB (database)
Mongoose (MongoDB ORM)


Other:
Axios (HTTP requests)
CORS (cross-origin support)



Contributing

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m "description").
Push to the branch (git push origin feature-branch).
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details (add a LICENSE file if desired).
Troubleshooting

MongoDB Connection Error:
Ensure MongoDB is running and the MONGO_URI in .env is correct.


Build Errors:
Delete the .next directory and rerun npm run dev or npm run build.


OneDrive Issues:
Move the project out of a synced OneDrive folder to avoid file system conflicts (e.g., from C:\Users\AJAY\OneDrive\Documents\Web development\doctor-listing to C:\Users\AJAY\Documents\doctor-listing).


React Errors:
Ensure import React is included in files using React features (e.g., pages/_app.js).



Contact
For questions or issues, contact [your-email@example.com] or open an issue on the GitHub repository.
Acknowledgments

Inspired by the doctor listing interface at https://www.apollo247.com/specialities/general-physician-internal-medicine.
Built with guidance from the xAI community and Next.js documentation.

