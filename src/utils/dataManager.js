// Data Manager Utility for Real-time Updates
// Stores and manages hospital data in localStorage

const STORAGE_KEYS = {
  PATIENTS: 'ehospital_patients',
  APPOINTMENTS: 'ehospital_appointments',
  LAST_UPDATE: 'ehospital_last_update'
}

// Initialize default data if not exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
    const defaultPatients = [
      { id: 1, name: 'John Doe', email: 'john@example.com', registered: '2026-01-25', status: 'active', phone: '+1 (555) 111-1111' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', registered: '2026-01-26', status: 'active', phone: '+1 (555) 222-2222' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', registered: '2026-01-27', status: 'active', phone: '+1 (555) 333-3333' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', registered: '2026-01-28', status: 'active', phone: '+1 (555) 444-4444' },
    ]
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(defaultPatients))
  }

  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    const defaultAppointments = [
      { id: 1, patient: 'John Doe', patientEmail: 'john@example.com', doctor: 'Dr. Sarah Johnson', date: '2026-01-30', time: '10:00', status: 'confirmed' },
      { id: 2, patient: 'Jane Smith', patientEmail: 'jane@example.com', doctor: 'Dr. Michael Chen', date: '2026-01-30', time: '11:00', status: 'pending' },
      { id: 3, patient: 'Bob Wilson', patientEmail: 'bob@example.com', doctor: 'Dr. Emily Rodriguez', date: '2026-01-30', time: '14:00', status: 'confirmed' },
      { id: 4, patient: 'Alice Brown', patientEmail: 'alice@example.com', doctor: 'Dr. James Wilson', date: '2026-01-30', time: '15:00', status: 'cancelled' },
    ]
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(defaultAppointments))
  }
}

// Get all patients
export const getPatients = () => {
  initializeData()
  const patients = localStorage.getItem(STORAGE_KEYS.PATIENTS)
  return patients ? JSON.parse(patients) : []
}

// Add new patient
export const addPatient = (patientData) => {
  const patients = getPatients()
  const newPatient = {
    id: Date.now(),
    name: `${patientData.firstName} ${patientData.lastName}`,
    email: patientData.email,
    phone: patientData.phone,
    registered: new Date().toISOString().split('T')[0],
    status: 'active',
    ...patientData
  }
  patients.push(newPatient)
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients))
  localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, Date.now().toString())
  return newPatient
}

// Update patient
export const updatePatient = (id, updates) => {
  const patients = getPatients()
  const index = patients.findIndex(p => p.id === id)
  if (index !== -1) {
    patients[index] = { ...patients[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients))
    localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, Date.now().toString())
    return patients[index]
  }
  return null
}

// Delete patient
export const deletePatient = (id) => {
  const patients = getPatients()
  const filtered = patients.filter(p => p.id !== id)
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(filtered))
  localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, Date.now().toString())
  return filtered
}

// Get all appointments
export const getAppointments = () => {
  initializeData()
  const appointments = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)
  return appointments ? JSON.parse(appointments) : []
}

// Add new appointment
export const addAppointment = (appointmentData) => {
  const appointments = getAppointments()
  const newAppointment = {
    id: Date.now(),
    patient: appointmentData.patientName,
    patientEmail: appointmentData.patientEmail,
    doctor: appointmentData.doctor,
    date: appointmentData.date,
    time: appointmentData.time,
    reason: appointmentData.reason || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  appointments.push(newAppointment)
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments))
  localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, Date.now().toString())
  return newAppointment
}

// Update appointment
export const updateAppointment = (id, updates) => {
  const appointments = getAppointments()
  const index = appointments.findIndex(a => a.id === id)
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments))
    localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, Date.now().toString())
    return appointments[index]
  }
  return null
}

// Delete appointment
export const deleteAppointment = (id) => {
  const appointments = getAppointments()
  const filtered = appointments.filter(a => a.id !== id)
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(filtered))
  localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, Date.now().toString())
  return filtered
}

// Get statistics
export const getStatistics = () => {
  const patients = getPatients()
  const appointments = getAppointments()
  const today = new Date().toISOString().split('T')[0]
  
  const todayAppointments = appointments.filter(a => a.date === today)
  const pendingAppointments = appointments.filter(a => a.status === 'pending')
  
  return {
    totalPatients: patients.length,
    todayAppointments: todayAppointments.length,
    pendingAppointments: pendingAppointments.length,
    totalDoctors: 4, // Fixed number of doctors
    totalAppointments: appointments.length
  }
}

// Get last update timestamp
export const getLastUpdate = () => {
  return localStorage.getItem(STORAGE_KEYS.LAST_UPDATE)
}

// Subscribe to changes (for real-time updates)
export const subscribeToChanges = (callback) => {
  const checkInterval = setInterval(() => {
    const lastUpdate = getLastUpdate()
    if (lastUpdate) {
      callback()
    }
  }, 1000) // Check every second
  
  return () => clearInterval(checkInterval)
}
