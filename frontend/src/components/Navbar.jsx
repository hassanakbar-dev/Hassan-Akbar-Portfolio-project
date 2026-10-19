import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaPaperPlane, FaFileDownload, FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { personalInfo } from '../data/portfolioData'
import LogoIcon from './LogoIcon'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme } = useTheme()
  const { user, openLoginModal, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-[#070b14]/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-lg shadow-black/20'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <LogoIcon size="md" />
            <div className="flex flex-col">
              <span className={`text-lg font-bold tracking-tight transition ${
                theme === 'dark' ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-cyan-600'
              }`}>
                Hassan Akbar
              </span>
              <span className={`text-xs font-mono font-semibold tracking-wider ${
                theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
              }`}>
                &lt;FullStack Dev /&gt;
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md transition ${
            theme === 'dark'
              ? 'bg-slate-900/70 border-slate-800'
              : 'bg-white/90 border-slate-200/90 shadow-sm'
          }`}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                      : theme === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}

            {/* In place of Dashboard: Show Login button when unauthenticated, or Dashboard link when authenticated */}
            {user ? (
              <Link
                to="/dashboard"
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  location.pathname === '/dashboard'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-white hover:bg-cyan-50 dark:hover:bg-slate-800/60'
                }`}
                title="Open Admin Dashboard"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Dashboard</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={openLoginModal}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-white hover:bg-cyan-50 dark:hover:bg-slate-800/60 cursor-pointer"
                title="Login to Open Dashboard"
              >
                <FaSignInAlt className="text-xs" />
                <span>Login</span>
              </button>
            )}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 border border-cyan-500/30 transition duration-200"
              title="Open and Download Resume PDF"
            >
              <FaFileDownload className="text-xs" />
              <span>Download CV</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 hover:shadow-cyan-600/35 hover:-translate-y-0.5 transition duration-200"
            >
              <FaPaperPlane className="text-xs" />
              <span>Hire Me</span>
            </Link>

            {/* If logged in: User avatar badge & logout */}
            {user && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-800">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:border-cyan-500/50 transition"
                  title={`Logged in as ${user.email} (Open Dashboard)`}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover border border-cyan-400" />
                  ) : (
                    <FaUserCircle className="w-4 h-4 text-cyan-500" />
                  )}
                  <span className="text-slate-800 dark:text-slate-200 max-w-[85px] truncate">
                    {(user?.name || user?.email || 'User').split(' ')[0]}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-900/60 transition cursor-pointer"
                  title="Sign Out / Logout"
                >
                  <FaSignOutAlt className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg border focus:outline-none transition ${
                theme === 'dark'
                  ? 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-200 hover:text-slate-900'
              }`}
              aria-label="Toggle Navigation"
            >
              {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={`md:hidden px-4 pt-3 pb-6 border-b transition ${
          theme === 'dark'
            ? 'bg-[#0a0f1d]/95 backdrop-blur-xl border-cyan-500/20'
            : 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-lg'
        }`}>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-xl text-base font-semibold transition ${
                    isActive
                      ? 'bg-cyan-600 text-white'
                      : theme === 'dark'
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}

            {user ? (
              <Link
                to="/dashboard"
                className={`px-4 py-2.5 rounded-xl text-base font-semibold transition flex items-center justify-between ${
                  location.pathname === '/dashboard'
                    ? 'bg-cyan-600 text-white'
                    : 'text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>Dashboard</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">Admin</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={openLoginModal}
                className="w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-800 transition flex items-center gap-2 cursor-pointer"
              >
                <FaSignInAlt className="text-sm" />
                <span>Login</span>
              </button>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                to="/contact"
                className="px-3.5 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm"
              >
                Hire Hassan
              </Link>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-xs font-bold rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center gap-1"
                title="Open and Download Resume PDF"
              >
                <FaFileDownload className="text-xs" />
                <span>CV</span>
              </a>

              {user && (
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-2 text-xs font-bold rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 flex items-center gap-1 cursor-pointer"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>Logout</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-500 hover:text-cyan-600 dark:text-slate-300 transition"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-500 hover:text-cyan-600 dark:text-slate-300 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
