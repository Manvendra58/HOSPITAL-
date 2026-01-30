import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Lock, Mail, ArrowLeft } from 'lucide-react'

const PatientLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Demo-only auth: accept any non-empty email and password length >= 8
    if (!formData.email || formData.password.length < 8) {
      setError('Please enter a valid email and a password of at least 8 characters.')
      return
    }

    window.localStorage.setItem('isPatientAuthenticated', 'true')
    window.localStorage.setItem('patientEmail', formData.email)
    navigate('/patient-portal')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 px-4">
      <div className="max-w-md w-full">
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>

        <div className="card">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-3">
              <User className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Login</h1>
            <p className="text-gray-600 text-sm mt-1 text-center">
              Sign in to manage appointments and view your patient portal.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  name="password"
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-2">
              Sign in
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              New patient?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PatientLogin

