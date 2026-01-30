import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Lock, Mail, ArrowLeft, Stethoscope } from 'lucide-react'

const AdminLogin = () => {
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

    // Simple demo credentials – replace with real auth later
    const demoEmail = 'admin@ehospital.com'
    const demoPassword = 'Admin@123'

    if (formData.email === demoEmail && formData.password === demoPassword) {
      window.localStorage.setItem('isAdminAuthenticated', 'true')
      navigate('/admin')
    } else {
      setError('Invalid admin credentials. Please try again.')
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/hospital-building.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-primary-900/70 to-gray-900/80"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>

        {/* Login Card with Glassmorphism */}
        <div className="backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                <Shield className="text-white" size={36} />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Stethoscope className="text-primary-600" size={24} />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Admin Portal
              </h1>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Secure access to the E-Hospital management system
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border-2 border-red-200 px-4 py-3 text-sm text-red-700 flex items-center space-x-2 animate-shake">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                    placeholder="admin@ehospital.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors"
                  />
                  <input
                    type="password"
                    name="password"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mt-2 p-3 bg-primary-50 rounded-lg border border-primary-100">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-primary-700">Demo Credentials:</span>
                  <br />
                  <span className="font-mono text-primary-600">admin@ehospital.com</span> /{' '}
                  <span className="font-mono text-primary-600">Admin@123</span>
                </p>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Shield size={20} />
              <span>Sign in to Admin Panel</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Protected by secure authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

