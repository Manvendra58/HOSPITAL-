import { useState } from 'react'
import { Calendar, Clock, User, MapPin } from 'lucide-react'

const DoctorSchedules = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Sample doctor data - in a real app, this would come from an API
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      image: '👩‍⚕️',
      schedule: {
        '2026-01-30': [
          { time: '09:00', available: true },
          { time: '10:00', available: true },
          { time: '11:00', available: false },
          { time: '14:00', available: true },
          { time: '15:00', available: true },
          { time: '16:00', available: true },
        ],
        '2026-01-31': [
          { time: '09:00', available: false },
          { time: '10:00', available: true },
          { time: '11:00', available: true },
          { time: '14:00', available: true },
          { time: '15:00', available: false },
          { time: '16:00', available: true },
        ],
      },
      location: 'Room 201, Floor 2',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Pediatrician',
      image: '👨‍⚕️',
      schedule: {
        '2026-01-30': [
          { time: '08:00', available: true },
          { time: '09:00', available: true },
          { time: '10:00', available: false },
          { time: '13:00', available: true },
          { time: '14:00', available: true },
          { time: '15:00', available: true },
        ],
        '2026-01-31': [
          { time: '08:00', available: true },
          { time: '09:00', available: true },
          { time: '10:00', available: true },
          { time: '13:00', available: false },
          { time: '14:00', available: true },
          { time: '15:00', available: true },
        ],
      },
      location: 'Room 105, Floor 1',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialization: 'Dermatologist',
      image: '👩‍⚕️',
      schedule: {
        '2026-01-30': [
          { time: '10:00', available: true },
          { time: '11:00', available: true },
          { time: '12:00', available: false },
          { time: '15:00', available: true },
          { time: '16:00', available: true },
          { time: '17:00', available: true },
        ],
        '2026-01-31': [
          { time: '10:00', available: false },
          { time: '11:00', available: true },
          { time: '12:00', available: true },
          { time: '15:00', available: true },
          { time: '16:00', available: false },
          { time: '17:00', available: true },
        ],
      },
      location: 'Room 312, Floor 3',
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialization: 'Orthopedic Surgeon',
      image: '👨‍⚕️',
      schedule: {
        '2026-01-30': [
          { time: '08:00', available: true },
          { time: '09:00', available: false },
          { time: '10:00', available: true },
          { time: '14:00', available: true },
          { time: '15:00', available: true },
          { time: '16:00', available: false },
        ],
        '2026-01-31': [
          { time: '08:00', available: true },
          { time: '09:00', available: true },
          { time: '10:00', available: true },
          { time: '14:00', available: false },
          { time: '15:00', available: true },
          { time: '16:00', available: true },
        ],
      },
      location: 'Room 408, Floor 4',
    },
  ]

  const getAvailableSlots = (doctor) => {
    return doctor.schedule[selectedDate] || []
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <Calendar className="text-white" size={24} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Doctor Schedules</h1>
        </div>
        <p className="text-gray-600 text-lg">View doctor availability and schedules</p>
      </div>

      <div className="card mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="input-field w-auto"
          />
          <div className="text-gray-600">
            {formatDate(selectedDate)}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {doctors.map((doctor) => {
          const slots = getAvailableSlots(doctor)
          const availableCount = slots.filter(s => s.available).length

          return (
            <div key={doctor.id} className="card">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-3xl">
                  {doctor.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-primary-600 font-medium">{doctor.specialization}</p>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Available Slots</span>
                  <span className="text-sm text-gray-600">
                    {availableCount} of {slots.length} available
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg text-center text-sm ${
                        slot.available
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-gray-100 text-gray-500 border border-gray-300'
                      }`}
                    >
                      <Clock size={14} className="mx-auto mb-1" />
                      <div>{slot.time}</div>
                      <div className="text-xs mt-1">
                        {slot.available ? 'Available' : 'Booked'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {doctors.length === 0 && (
        <div className="card text-center py-12">
          <Calendar className="text-gray-400 mx-auto mb-4" size={48} />
          <p className="text-gray-600">No schedules available for the selected date.</p>
        </div>
      )}
    </div>
  )
}

export default DoctorSchedules
