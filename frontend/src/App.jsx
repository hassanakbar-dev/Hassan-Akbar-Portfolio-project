import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function MainLayout() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#070b14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300' 
        : 'bg-[#f8fafc] text-slate-800 selection:bg-cyan-500/30 selection:text-cyan-800'
    }`}>
      {/* Persistent Sticky Navbar */}
      <Navbar />

      {/* Global Auth Modal */}
      <AuthModal />

      {/* Dynamic Route Pages */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <MainLayout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
