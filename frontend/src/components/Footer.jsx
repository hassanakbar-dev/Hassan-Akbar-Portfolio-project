import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaHeart } from 'react-icons/fa'
import { personalInfo } from '../data/portfolioData'
import LogoIcon from './LogoIcon'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#050811] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <LogoIcon size="md" />
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  {personalInfo.name}
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  {personalInfo.title}
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Engineering modern, responsive web applications with a focus on performance, scalability, and user delight. Available worldwide for freelance projects and team roles.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-850 transition"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition"
                aria-label="Email"
                title="Email Me"
              >
                <FaEnvelope className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-cyan-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-cyan-400 transition">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-cyan-400 transition">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-cyan-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Download CV (PDF)
                </a>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-cyan-400 transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-cyan-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-cyan-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Work Status & Direct Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Current Status
            </h4>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                  Available Now
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Ready to take on freelance projects, client contracts, and full-time software engineering roles.
              </p>
            </div>
            <Link
              to="/contact"
              className="block text-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-750 border border-slate-700/80 hover:border-cyan-500/40 transition"
            >
              Start a Conversation →
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Hassan Akbar. Crafted with <FaHeart className="text-red-500 inline w-3 h-3" /> using React & Tailwind CSS.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
          >
            <span>Back to top</span>
            <FaArrowUp className="w-3 h-3 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  )
}
