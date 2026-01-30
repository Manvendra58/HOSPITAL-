import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import PatientRegistration from './components/PatientRegistration'
import PatientLogin from './components/PatientLogin'
import DoctorSchedules from './components/DoctorSchedules'
import AppointmentBooking from './components/AppointmentBooking'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'
import PatientPortal from './components/PatientPortal'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route element={<Layout />}>
          <Route path="/register" element={<PatientRegistration />} />
          <Route path="/schedules" element={<DoctorSchedules />} />
          <Route path="/appointments" element={<AppointmentBooking />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
