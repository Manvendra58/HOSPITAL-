import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, CheckCircle, Lock, Shield, ArrowLeft, Mail } from 'lucide-react'
import { addPatient } from '../utils/dataManager'

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',
    emergencyContact: '',
    emergencyPhone: '',
    emergencyRelation: '',
    medicalHistory: '',
    allergies: '',
    agreeToTerms: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Save patient to data manager
    addPatient(formData)
    
    console.log('Patient registration data:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        insuranceProvider: '',
        insurancePolicyNumber: '',
        emergencyContact: '',
        emergencyPhone: '',
        emergencyRelation: '',
        medicalHistory: '',
        allergies: '',
        agreeToTerms: false,
      })
      setErrors({})
    }, 5000)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Welcome to E-Hospital! Your account has been created successfully.
          </p>
          <div className="bg-primary-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" size={18} />
                <span>Check your email ({formData.email}) for a verification link</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" size={18} />
                <span>You can now book appointments with our doctors</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" size={18} />
                <span>View your medical records and appointment history</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointments" className="btn-primary">
              Book Your First Appointment
            </Link>
            <Link to="/patient-portal" className="btn-secondary">
              Go to Patient Portal
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <UserPlus className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Patient Registration</h1>
            <p className="text-gray-600 text-lg mt-1">Create your account to access our healthcare services</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-8">
        {/* Personal Information Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <UserPlus className="text-primary-600 mr-2" size={20} />
            Personal Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field pl-10"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Security Section */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Lock className="text-primary-600 mr-2" size={20} />
            Account Security
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`input-field pl-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Minimum 8 characters"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`input-field pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Re-enter your password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Address Section */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="text-primary-600 mr-2" size={20} />
            Address Information
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="123 Main Street"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="12345"
              />
            </div>
          </div>
        </div>

        {/* Insurance Information Section */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Insurance Information (Optional)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Provider
              </label>
              <input
                type="text"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Blue Cross Blue Shield"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Policy Number
              </label>
              <input
                type="text"
                name="insurancePolicyNumber"
                value={formData.insurancePolicyNumber}
                onChange={handleChange}
                className="input-field"
                placeholder="Policy number"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Emergency Contact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="+1 (555) 987-6543"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship *
              </label>
              <select
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select Relationship</option>
                <option value="spouse">Spouse</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="child">Child</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Medical Information Section */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Medical Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical History
              </label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                rows="4"
                className="input-field"
                placeholder="Any relevant medical history, previous surgeries, or conditions..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allergies
              </label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                rows="4"
                className="input-field"
                placeholder="List any known allergies (medications, food, etc.)..."
              />
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="border-t pt-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-1 mr-3 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                Privacy Policy
              </a>
              *
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-xs mt-1 ml-8">{errors.agreeToTerms}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t">
          <p className="text-sm text-gray-600 mb-4 sm:mb-0">
            Already have an account?{' '}
            <Link to="/patient-login" className="text-primary-600 hover:text-primary-700 font-medium">
              Login here
            </Link>
          </p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: '',
                  dateOfBirth: '',
                  gender: '',
                  address: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  insuranceProvider: '',
                  insurancePolicyNumber: '',
                  emergencyContact: '',
                  emergencyPhone: '',
                  emergencyRelation: '',
                  medicalHistory: '',
                  allergies: '',
                  agreeToTerms: false,
                })
                setErrors({})
              }}
              className="btn-secondary"
            >
              Clear Form
            </button>
            <button type="submit" className="btn-primary text-lg px-8">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PatientRegistration
