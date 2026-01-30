import { Link } from 'react-router-dom'
import { 
  UserPlus, 
  Calendar, 
  CalendarCheck, 
  Settings, 
  Stethoscope,
  Clock,
  Shield,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: UserPlus,
      title: 'Patient Registration',
      description: 'Quick and easy patient registration with digital forms',
      link: '/register',
      color: 'bg-blue-500'
    },
    {
      icon: Calendar,
      title: 'Doctor Schedules',
      description: 'View and manage doctor availability and schedules',
      link: '/schedules',
      color: 'bg-green-500'
    },
    {
      icon: CalendarCheck,
      title: 'Appointment Booking',
      description: 'Book appointments with your preferred doctors',
      link: '/appointments',
      color: 'bg-purple-500'
    },
    {
      icon: Settings,
      title: 'Admin Panel',
      description: 'Comprehensive admin dashboard for hospital management',
      link: '/admin',
      color: 'bg-orange-500'
    },
  ]

  const benefits = [
    'Streamlined patient management',
    'Real-time appointment scheduling',
    'Digital health records',
    'Automated notifications',
    'Secure data management',
    '24/7 accessibility'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center shadow-lg">
                <Stethoscope className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                E-Hospital
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/register"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Register
              </Link>
              <Link
                to="/patient-login"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Patient Login
              </Link>
              <Link
                to="/appointments"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Book Appointment
              </Link>
              <Link
                to="/admin-login"
                className="btn-primary"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Modern Healthcare
              <span className="block text-primary-600 mt-2">Management System</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mb-8">
              Streamline your hospital operations with our comprehensive digital platform. 
              Manage patients, appointments, and schedules all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/schedules" className="btn-secondary text-lg px-8 py-3 inline-flex items-center justify-center">
                View Schedules
                <Calendar className="ml-2" size={20} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-white rounded-3xl blur-2xl opacity-70" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <img
                src="/hospital-building.png"
                alt="E-Hospital building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600">Everything you need to manage your hospital efficiently</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link
                key={index}
                to={feature.link}
                className="card group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform">
                  Learn more
                  <ArrowRight className="ml-2" size={16} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose E-Hospital Management?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform transforms how hospitals manage their daily operations, 
                providing a seamless experience for both staff and patients.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-primary-600 flex-shrink-0" size={24} />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card text-center">
                <Users className="text-primary-600 mx-auto mb-4" size={48} />
                <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                <div className="text-gray-600">Patients Served</div>
              </div>
              <div className="card text-center">
                <Clock className="text-primary-600 mx-auto mb-4" size={48} />
                <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600">Available</div>
              </div>
              <div className="card text-center">
                <Shield className="text-primary-600 mx-auto mb-4" size={48} />
                <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-gray-600">Secure</div>
              </div>
              <div className="card text-center">
                <CheckCircle className="text-primary-600 mx-auto mb-4" size={48} />
                <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of healthcare providers using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              Register Patient
              <UserPlus className="ml-2" size={20} />
            </Link>
            <Link to="/appointments" className="bg-primary-800 text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-900 transition-colors inline-flex items-center justify-center border-2 border-white">
              Book Appointment
              <CalendarCheck className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Stethoscope size={24} />
                </div>
                <span className="text-xl font-bold">E-Hospital</span>
              </div>
              <p className="text-gray-400">
                Modern healthcare management for the digital age.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-white transition-colors">Patient Registration</Link></li>
                <li><Link to="/schedules" className="hover:text-white transition-colors">Doctor Schedules</Link></li>
                <li><Link to="/appointments" className="hover:text-white transition-colors">Appointments</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/admin-login" className="hover:text-white transition-colors">Admin Login</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@ehospital.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Healthcare St</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 E-Hospital Management Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
