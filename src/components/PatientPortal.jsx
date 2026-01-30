import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, CalendarCheck, FileText, Activity, Stethoscope, Lock } from 'lucide-react'

const PatientPortal = () => {
  const navigate = useNavigate()
  const [authorized, setAuthorized] = useState(true)

  useEffect(() => {
    const isPatient = window.localStorage.getItem('isPatientAuthenticated') === 'true'
    if (!isPatient) {
      setAuthorized(false)
    }
  }, [])

  const upcomingAppointments = [
    {
      id: 1,
      date: '2026-02-01',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      status: 'Confirmed',
    },
    {
      id: 2,
      date: '2026-02-15',
      time: '02:00 PM',
      doctor: 'Dr. Michael Chen',
      department: 'Pediatrics',
      status: 'Scheduled',
    },
  ]

  if (!authorized) {
    return (
      <div className="max-w-xl mx-auto mt-16 card text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
          <Lock className="text-red-500" size={26} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Login Required</h2>
        <p className="text-gray-600 mb-6">
          You must be logged in as a patient to access the patient portal.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Go Back
          </button>
          <Link to="/patient-login" className="btn-primary">
            Go to Patient Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Portal</h1>
              <p className="text-gray-600">
                View your upcoming appointments and manage your health information.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/appointments" className="btn-primary">
              Book New Appointment
            </Link>
            <button
              onClick={() => {
                window.localStorage.removeItem('isPatientAuthenticated')
                window.localStorage.removeItem('patientEmail')
                navigate('/patient-login')
              }}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CalendarCheck className="text-primary-600 mr-2" size={20} />
              Upcoming Appointments
            </h2>
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-600">
                You have no upcoming appointments.{' '}
                <Link to="/appointments" className="text-primary-600 font-medium">
                  Book one now.
                </Link>
              </p>
            ) : (
              <ul className="space-y-4">
                {upcomingAppointments.map((appt) => (
                  <li
                    key={appt.id}
                    className="flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {appt.date} · {appt.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appt.department} with {appt.doctor}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {appt.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <FileText className="text-primary-600 mr-2" size={18} />
              Quick Links
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/appointments" className="text-primary-600 hover:text-primary-700">
                  View all appointments
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Download medical reports
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Update personal information
                </a>
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Activity className="text-primary-600 mr-2" size={18} />
              Your Health Summary
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• No critical alerts at this time</li>
              <li>• Last visit: 10 Jan 2026, General Checkup</li>
              <li>• Next scheduled visit: 01 Feb 2026, Cardiology</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Stethoscope className="text-primary-600 mr-2" size={18} />
              Need Help?
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              Our support team is available 24/7 to help you with appointments and medical records.
            </p>
            <p className="text-sm text-gray-700">
              Call: <span className="font-semibold">+1 (555) 123-4567</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientPortal

