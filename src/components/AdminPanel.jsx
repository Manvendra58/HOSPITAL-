import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Settings, Users, Calendar, FileText, BarChart3, Bell, Search, Lock, RefreshCw, Edit2, X } from 'lucide-react'
import { 
  getPatients, 
  getAppointments, 
  getStatistics, 
  updateAppointment, 
  deleteAppointment,
  updatePatient,
  deletePatient,
  subscribeToChanges
} from '../utils/dataManager'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAuthorized, setIsAuthorized] = useState(true)
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [stats, setStats] = useState({ totalPatients: 0, todayAppointments: 0, pendingAppointments: 0, totalDoctors: 4 })
  const [searchTerm, setSearchTerm] = useState('')
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [editingPatient, setEditingPatient] = useState(null)
  const navigate = useNavigate()

  // Load data function
  const loadData = () => {
    const allPatients = getPatients()
    const allAppointments = getAppointments()
    const statistics = getStatistics()
    
    setPatients(allPatients)
    setAppointments(allAppointments.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)))
    setStats(statistics)
  }

  useEffect(() => {
    const isAdmin = window.localStorage.getItem('isAdminAuthenticated') === 'true'
    if (!isAdmin) {
      setIsAuthorized(false)
    } else {
      loadData()
      
      // Subscribe to real-time changes
      const unsubscribe = subscribeToChanges(() => {
        loadData()
      })
      
      // Also listen to storage events for cross-tab updates
      const handleStorageChange = () => {
        loadData()
      }
      window.addEventListener('storage', handleStorageChange)
      
      // Poll for changes every 2 seconds
      const interval = setInterval(loadData, 2000)
      
      return () => {
        unsubscribe()
        window.removeEventListener('storage', handleStorageChange)
        clearInterval(interval)
      }
    }
  }, [])

  // Filter data based on search
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAppointments = appointments.filter(a =>
    a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get recent appointments (last 10)
  const recentAppointments = filteredAppointments.slice(0, 10)

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
    }
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`
  }

  const handleUpdateAppointmentStatus = (id, newStatus) => {
    updateAppointment(id, { status: newStatus })
    loadData()
    setEditingAppointment(null)
  }

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(id)
      loadData()
    }
  }

  const handleDeletePatient = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deletePatient(id)
      loadData()
    }
  }

  if (!isAuthorized) {
    return (
      <div className="max-w-xl mx-auto mt-16 card text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
          <Lock className="text-red-500" size={26} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h2>
        <p className="text-gray-600 mb-6">
          You must be logged in as an administrator to view the admin panel.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Go Back
          </button>
          <Link to="/admin-login" className="btn-primary">
            Go to Admin Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Settings className="text-white" size={24} />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <p className="text-gray-600 text-lg">Manage hospital operations and view analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <button 
              onClick={loadData}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={20} />
            </button>
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell size={20} />
              {stats.pendingAppointments > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => {
                window.localStorage.removeItem('isAdminAuthenticated')
                navigate('/admin-login')
              }}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'patients', label: 'Patients', icon: Users },
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'reports', label: 'Reports', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalPatients.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Today's Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.todayAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-green-600" size={24} />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Bell className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Doctors</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalDoctors}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Appointments</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Doctor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{appointment.patient}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{appointment.doctor}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{appointment.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{appointment.time}</td>
                      <td className="px-4 py-3">
                        <span className={getStatusBadge(appointment.status)}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Patients Tab */}
      {activeTab === 'patients' && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              All Patients ({filteredPatients.length})
            </h2>
            <Link to="/register" className="btn-primary">
              Add New Patient
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Registered</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No patients found
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{patient.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{patient.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{patient.phone || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{patient.registered}</td>
                      <td className="px-4 py-3">
                        <span className={getStatusBadge(patient.status)}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleDeletePatient(patient.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              All Appointments ({filteredAppointments.length})
            </h2>
            <Link to="/appointments" className="btn-primary">
              Create Appointment
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Doctor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{appointment.patient}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{appointment.doctor}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{appointment.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{appointment.time}</td>
                      <td className="px-4 py-3">
                        {editingAppointment === appointment.id ? (
                          <select
                            value={appointment.status}
                            onChange={(e) => handleUpdateAppointmentStatus(appointment.id, e.target.value)}
                            className="text-xs border rounded px-2 py-1"
                            onBlur={() => setEditingAppointment(null)}
                            autoFocus
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span 
                            className={getStatusBadge(appointment.status)}
                            onClick={() => setEditingAppointment(appointment.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            {appointment.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setEditingAppointment(appointment.id)}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                          >
                            <Edit2 size={14} className="mr-1" />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                          >
                            <X size={14} className="mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reports & Analytics</h2>
            <p className="text-gray-600 mb-6">Generate and view various reports</p>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="card hover:shadow-lg transition-shadow text-left">
                <FileText className="text-primary-600 mb-2" size={24} />
                <h3 className="font-semibold text-gray-900 mb-1">Patient Reports</h3>
                <p className="text-sm text-gray-600">View patient statistics and reports</p>
              </button>
              <button className="card hover:shadow-lg transition-shadow text-left">
                <BarChart3 className="text-primary-600 mb-2" size={24} />
                <h3 className="font-semibold text-gray-900 mb-1">Appointment Analytics</h3>
                <p className="text-sm text-gray-600">Analyze appointment trends</p>
              </button>
              <button className="card hover:shadow-lg transition-shadow text-left">
                <Calendar className="text-primary-600 mb-2" size={24} />
                <h3 className="font-semibold text-gray-900 mb-1">Schedule Reports</h3>
                <p className="text-sm text-gray-600">Doctor schedule reports</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
