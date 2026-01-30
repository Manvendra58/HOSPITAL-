# E-Hospital Management Portal

A modern, professional web portal for managing hospital services and patient interactions. Built with React, Vite, and Tailwind CSS.

## Features

- **Patient Registration**: Digital patient registration with comprehensive forms
- **Doctor Schedules**: View and manage doctor availability and schedules
- **Appointment Booking**: Easy appointment booking system with multi-step form
- **Admin Management Panel**: Comprehensive admin dashboard with analytics and management tools

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
e-hospital management/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx       # Main landing page
│   │   ├── Layout.jsx            # Navigation layout
│   │   ├── PatientRegistration.jsx
│   │   ├── DoctorSchedules.jsx
│   │   ├── AppointmentBooking.jsx
│   │   └── AdminPanel.jsx
│   ├── App.jsx                   # Main app component with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Technologies Used

- **React 18**: UI library
- **React Router**: Navigation and routing
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Features Overview

### Landing Page
- Modern, attractive hero section
- Feature highlights
- Benefits showcase
- Call-to-action sections
- Responsive design

### Patient Registration
- Comprehensive registration form
- Emergency contact information
- Medical history capture
- Form validation

### Doctor Schedules
- Date-based schedule viewing
- Real-time availability display
- Multiple doctor support
- Visual slot indicators

### Appointment Booking
- Multi-step booking process
- Doctor selection
- Date and time selection
- Confirmation system

### Admin Panel
- Dashboard with statistics
- Patient management
- Appointment management
- Reports and analytics
- Search functionality

## License

MIT
