import { useState } from 'react'
import { CalendarCheck, Clock, User, CheckCircle } from 'lucide-react'
import { addAppointment } from '../utils/dataManager'

const AppointmentBooking = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
  })

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist' },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Pediatrician' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Dermatologist' },
    { id: 4, name: 'Dr. James Wilson', specialization: 'Orthopedic Surgeon' },
  ]

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save appointment to data manager
    const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId))
    addAppointment({
      patientName: formData.patientName,
      patientEmail: formData.patientEmail,
      doctor: selectedDoctor?.name || 'Unknown Doctor',
      date: formData.date,
      time: formData.time,
      reason: formData.reason
    })
    
    console.log('Appointment data:', formData)
    setStep(3)
  }

  const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId))

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-12">
          <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
          <p className="text-gray-600 mb-6">Your appointment has been successfully scheduled.</p>
          <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-semibold">{formData.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-semibold">{selectedDoctor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{new Date(formData.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">{formData.time}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setStep(1)
              setFormData({
                patientName: '',
                patientEmail: '',
                patientPhone: '',
                doctorId: '',
                date: '',
                time: '',
                reason: '',
              })
            }}
            className="btn-primary mt-6"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
            <CalendarCheck className="text-white" size={24} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Book Appointment</h1>
        </div>
        <p className="text-gray-600 text-lg">Schedule your appointment with our doctors</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
            }`}>
              {step > 1 ? <CheckCircle size={20} /> : '1'}
            </div>
            <span className="ml-2 font-medium">Patient Info</span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`} />
          <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
            }`}>
              {step > 2 ? <CheckCircle size={20} /> : '2'}
            </div>
            <span className="ml-2 font-medium">Appointment Details</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Patient Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="John Doe"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="patientEmail"
                  value={formData.patientEmail}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="patientPhone"
                  value={formData.patientPhone}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-primary"
              >
                Next: Select Doctor & Time
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Appointment Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor *
              </label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Choose a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="4"
                className="input-field"
                placeholder="Brief description of your symptoms or reason for visit..."
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                Back
              </button>
              <button type="submit" className="btn-primary">
                Confirm Appointment
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default AppointmentBooking
