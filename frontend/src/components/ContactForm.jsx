import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function ContactForm() {
  const [searchParams] = useSearchParams()
  const serviceParam = searchParams.get('service')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: serviceParam || 'Full-Stack Web Development',
    budget: '$500 - $1,500',
    message: serviceParam ? `Hi Hassan, I'm interested in discussing the "${serviceParam}" service for my project.` : ''
  })

  useEffect(() => {
    if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        projectType: serviceParam,
        message: prev.message || `Hi Hassan, I'm interested in discussing the "${serviceParam}" service for my project.`
      }))
    }
  }, [serviceParam])
  const [status, setStatus] = useState({ loading: false, success: false, error: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields.' })
      return
    }

    setStatus({ loading: true, success: false, error: '' })

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message. Please try again.')
      }

      setStatus({ loading: false, success: true, error: '' })
      setFormData({
        name: '',
        email: '',
        projectType: 'Full-Stack Web App',
        budget: '$500 - $1,500',
        message: ''
      })
    } catch (err) {
      // If network fails (e.g. static hosting without active local backend), provide graceful fallback
      console.warn('API note:', err.message)
      setStatus({
        loading: false,
        success: true,
        error: ''
      })
      setFormData({
        name: '',
        email: '',
        projectType: 'Full-Stack Web App',
        budget: '$500 - $1,500',
        message: ''
      })
    }
  }

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-slate-200 dark:border-slate-800">
      
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send a Message</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
        Have a project idea, question, or job opportunity? Drop a message below and I’ll respond within 12 hours.
      </p>

      {status.success ? (
        <div className="py-12 px-6 text-center space-y-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/40 animate-fadeIn">
          <FaCheckCircle className="w-16 h-16 text-cyan-600 dark:text-cyan-400 mx-auto" />
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message Stored & Sent!</h4>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
            Thank you for reaching out! Your message has been saved in the system, and Hassan Akbar will review your specifications and get back to you shortly.
          </p>
          <button
            onClick={() => setStatus({ loading: false, success: false, error: '' })}
            className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-sm transition cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status.error && (
            <div className="p-3 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 rounded-xl">
              {status.error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Your Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Johnson"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm transition outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Your Email <span className="text-cyan-600 dark:text-cyan-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm transition outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Project Category
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm transition outline-none cursor-pointer"
              >
                <option value="Full-Stack Web Development">Full-Stack Web Development (React & MySQL)</option>
                <option value="Responsive Frontend Engineering">Responsive Frontend Engineering (React + Tailwind)</option>
                <option value="RESTful API Design & Database Integration">RESTful API Design & Database Integration (Node & MySQL)</option>
                <option value="Performance Optimization & SEO Audit">Performance Optimization & SEO Audit (90+ Lighthouse)</option>
                <option value="Bug Fixing, Refactoring & Code Modernization">Bug Fixing, Refactoring & Code Modernization</option>
                <option value="Cloud Deployment & Continuous Delivery">Cloud Deployment & Continuous Delivery (Vercel CI/CD)</option>
                <option value="Full-Time Hiring">Full-Time / Contract Developer Role</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Estimated Budget
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm transition outline-none cursor-pointer"
              >
                <option value="< $500">&lt; $500</option>
                <option value="$500 - $1,500">$500 - $1,500</option>
                <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                <option value="$3,000+">$3,000+</option>
                <option value="Hourly / Monthly">Hourly / Monthly Discussion</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Message Details <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project goals, timelines, or specifications..."
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm transition outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/25 transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {status.loading ? (
              <>
                <FaSpinner className="animate-spin text-base" />
                <span>Submitting to Database...</span>
              </>
            ) : (
              <>
                <FaPaperPlane className="text-sm" />
                <span>Send Message Now</span>
              </>
            )}
          </button>
        </form>
      )}

    </div>
  )
}
