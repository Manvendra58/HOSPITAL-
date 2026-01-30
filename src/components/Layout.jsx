import { Link, Outlet, useLocation } from 'react-router-dom'
import { Home, UserPlus, Calendar, CalendarCheck, Settings } from 'lucide-react'

const Layout = () => {
  const location = useLocation()

  const navItems = [
    { path: '/register', label: 'Patient Registration', icon: UserPlus },
    { path: '/schedules', label: 'Doctor Schedules', icon: Calendar },
    { path: '/appointments', label: 'Book Appointment', icon: CalendarCheck },
    { path: '/admin', label: 'Admin Panel', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900">E-Hospital</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
            >
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
