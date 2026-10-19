import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaDatabase, FaEnvelope, FaInbox, FaPlus, FaTrash, 
  FaCheck, FaReply, FaSearch, FaSyncAlt, FaExternalLinkAlt, 
  FaFolder, FaServer, FaClock, FaCheckCircle, FaExclamationCircle, 
  FaStar, FaShieldAlt, FaSpinner, FaCodeBranch, FaEye, FaTimes,
  FaSignInAlt, FaSignOutAlt, FaUserCheck
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Dashboard() {
  const { user, openLoginModal, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'messages' | 'projects' | 'database'
  const [messages, setMessages] = useState([])
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchMsg, setSearchMsg] = useState('')
  const [msgFilter, setMsgFilter] = useState('all') // 'all' | 'unread' | 'read' | 'replied'
  const [actionNotice, setActionNotice] = useState('')

  // New Project Form State
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Full-Stack',
    description: '',
    tags: '',
    live_demo: '',
    github: '',
    featured: true,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    metrics: '100% Responsive'
  })
  const [submittingProject, setSubmittingProject] = useState(false)

  // Fetch all dashboard data
  const fetchData = async () => {
    setRefreshing(true)
    try {
      // 1. Fetch Stats & Health
      const statsRes = await fetch(`${API_URL}/api/stats`).catch(() => null)
      if (statsRes && statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData.data)
      }

      // 2. Fetch Messages
      const msgRes = await fetch(`${API_URL}/api/contact`).catch(() => null)
      if (msgRes && msgRes.ok) {
        const msgData = await msgRes.json()
        setMessages(msgData.data || [])
      }

      // 3. Fetch Projects
      const projRes = await fetch(`${API_URL}/api/projects`).catch(() => null)
      if (projRes && projRes.ok) {
        const projData = await projRes.json()
        setProjects(projData.data || [])
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Auto-dismiss notice
  const triggerNotice = (text) => {
    setActionNotice(text)
    setTimeout(() => setActionNotice(''), 4000)
  }

  // Handle Message Status Update
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status } : m))
        )
        triggerNotice(`Message #${id} marked as ${status}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Handle Delete Message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm(`Delete message #${id}?`)) return
    try {
      const res = await fetch(`${API_URL}/api/contact/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id))
        triggerNotice(`Message #${id} deleted from database`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Handle Create Project
  const handleCreateProject = async (e) => {
    e.preventDefault()
    if (!newProject.title.trim() || !newProject.description.trim()) {
      alert('Please fill in title and description')
      return
    }

    setSubmittingProject(true)
    try {
      const tagsArray = newProject.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

      const payload = {
        ...newProject,
        tags: tagsArray
      }

      const res = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        triggerNotice(`Project "${newProject.title}" saved to MySQL!`)
        setShowAddProject(false)
        setNewProject({
          title: '',
          category: 'Full-Stack',
          description: '',
          tags: '',
          live_demo: '',
          github: '',
          featured: true,
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          metrics: '100% Responsive'
        })
        fetchData()
      } else {
        alert('Failed to save project to database')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmittingProject(false)
    }
  }

  // Handle Delete Project
  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Delete project "${title}"?`)) return
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id))
        triggerNotice(`Project "${title}" deleted from MySQL`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Handle Toggle Featured Project
  const handleToggleFeatured = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}/featured`, {
        method: 'PATCH'
      })
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
        )
        triggerNotice('Project featured status updated')
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Filter messages
  const filteredMessages = (messages || []).filter((m) => {
    const matchesFilter =
      msgFilter === 'all' || m?.status === msgFilter
    const matchesSearch =
      m?.name?.toLowerCase().includes(searchMsg.toLowerCase()) ||
      m?.email?.toLowerCase().includes(searchMsg.toLowerCase()) ||
      m?.message?.toLowerCase().includes(searchMsg.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Calculate unread count
  const unreadCount = (messages || []).filter((m) => m?.status === 'unread').length

  // Protected Route Guard: If not logged in, Dashboard cannot be accessed!
  if (!user) {
    return (
      <div className="pt-36 pb-28 max-w-lg mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-xl shadow-cyan-600/10">
          <FaShieldAlt className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            Access Restricted
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Admin Login Required
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Yeh section sirf authenticated user/admin ke liye hai. Dashboard open karne ke liye pehle Login karein.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={openLoginModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/20 active:scale-95 transition cursor-pointer"
          >
            <FaSignInAlt className="text-sm" />
            <span>Login to Open Dashboard</span>
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* ----------------- TOP ADMIN HEADER ----------------- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Admin Control Center
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              MySQL Live: portfolio_db
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Portfolio <span className="text-gradient-cyan">Management Dashboard</span>
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-cyan-500/40 shadow-sm transition cursor-pointer disabled:opacity-50"
            title="Refresh database records"
          >
            <FaSyncAlt className={`text-xs ${refreshing ? 'animate-spin text-cyan-500' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync Database'}</span>
          </button>

          <a
            href="http://localhost/phpmyadmin/index.php?route=/database/structure&db=portfolio_db"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 transition"
            title="Open phpMyAdmin"
          >
            <FaDatabase className="text-xs text-amber-600 dark:text-amber-400" />
            <span>Open in phpMyAdmin</span>
          </a>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 transition"
          >
            <FaExternalLinkAlt className="text-xs" />
            <span>View Live Site</span>
          </Link>

          {/* User Auth Info in Dashboard */}
          {user ? (
            <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200 dark:border-slate-800">
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-xs font-semibold text-cyan-800 dark:text-cyan-300"
                title={`Logged in as ${user?.email || ''}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="max-w-[100px] truncate">{user?.name || user?.email || 'Admin'}</span>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                title="Logout"
              >
                <FaSignOutAlt className="text-xs" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 transition"
            >
              <FaSignInAlt className="text-cyan-500 text-xs" />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="p-3.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-200 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-cyan-600 dark:text-cyan-400" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice('')} className="text-slate-400 hover:text-slate-600">
            <FaTimes />
          </button>
        </div>
      )}

      {/* ----------------- STATS CARDS ROW ----------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block uppercase tracking-wider">
              Client Inquiries
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                {messages.length}
              </span>
              {unreadCount > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-400 block">Stored in MySQL `contacts`</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
            <FaEnvelope className="w-5 h-5" />
          </div>
        </div>

        {/* Total Projects in DB */}
        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block uppercase tracking-wider">
              Live Projects
            </span>
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono block">
              {projects.length}
            </span>
            <span className="text-[11px] text-slate-400 block">Stored in MySQL `projects`</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <FaFolder className="w-5 h-5" />
          </div>
        </div>

        {/* Database Status */}
        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block uppercase tracking-wider">
              Database Engine
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                MySQL 3306
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">DB: `portfolio_db`</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
            <FaDatabase className="w-5 h-5" />
          </div>
        </div>

        {/* Server Status */}
        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block uppercase tracking-wider">
              Backend API
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Port 5000 Active
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">Node.js + Express 5</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
            <FaServer className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ----------------- TAB NAVIGATION ----------------- */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FaInbox />
          <span>Client Messages</span>
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FaFolder />
          <span>Projects Manager ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'database'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FaDatabase />
          <span>Database Details</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* ----------------- TAB 1: OVERVIEW ----------------- */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Quick Actions Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-900 to-blue-950 text-white space-y-3 shadow-lg">
              <h3 className="text-lg font-bold">New Inquiries Awaiting Reply</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                You have {unreadCount} unread message(s) from potential clients. Quick replies increase contract conversion.
              </p>
              <button
                onClick={() => { setActiveTab('messages'); setMsgFilter('unread') }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition shadow-sm cursor-pointer"
              >
                <span>View Unread ({unreadCount})</span>
                <span>→</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add Project to Portfolio</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Add a new full-stack project or prototype directly to MySQL. It will be stored and indexed immediately.
              </p>
              <button
                onClick={() => { setActiveTab('projects'); setShowAddProject(true) }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 transition shadow-sm cursor-pointer"
              >
                <FaPlus className="text-xs" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">phpMyAdmin Quick Access</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Inspect raw MySQL records, run SQL queries, view table indexes, and export database dumps.
              </p>
              <a
                href="http://localhost/phpmyadmin/index.php?route=/database/structure&db=portfolio_db"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition"
              >
                <FaDatabase className="text-amber-500" />
                <span>Launch phpMyAdmin</span>
              </a>
            </div>
          </div>

          {/* Recent Inquiries Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Inquiries in Database
              </h3>
              <button
                onClick={() => setActiveTab('messages')}
                className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                View All Messages ({messages.length}) →
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="p-8 text-center rounded-2xl glass-card border border-slate-200 dark:border-slate-800">
                <FaInbox className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No contact messages received yet</p>
                <p className="text-xs text-slate-400">Submissions from the Contact form will appear here instantly.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.slice(0, 3).map((msg) => (
                  <div
                    key={msg.id}
                    className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {msg.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          &lt;{msg.email}&gt;
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            msg.status === 'unread'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : msg.status === 'replied'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 max-w-2xl">
                        "{msg.message}"
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                        <span>Project: {msg.project_type}</span>
                        <span>•</span>
                        <span>Budget: {msg.budget}</span>
                        <span>•</span>
                        <span>{new Date(msg.created_at).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <a
                        href={`mailto:${msg.email}?subject=Re: Your Inquiry on Portfolio (${msg.project_type})`}
                        className="p-2 rounded-xl text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 transition"
                        title="Reply via Email"
                      >
                        <FaReply className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleUpdateStatus(msg.id, msg.status === 'unread' ? 'read' : 'replied')}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
                      >
                        {msg.status === 'unread' ? 'Mark Read' : 'Mark Replied'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ----------------- TAB 2: CLIENT MESSAGES INBOX ----------------- */}
      {/* ========================================================================= */}
      {activeTab === 'messages' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <input
                type="text"
                value={searchMsg}
                onChange={(e) => setSearchMsg(e.target.value)}
                placeholder="Search messages by sender name, email, or content..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
              />
            </div>

            {/* Status Filter Pills */}
            <div className="flex items-center gap-1.5">
              {['all', 'unread', 'read', 'replied'].map((f) => (
                <button
                  key={f}
                  onClick={() => setMsgFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition cursor-pointer ${
                    msgFilter === f
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
                </button>
              ))}
            </div>
          </div>

          {/* Messages List */}
          {filteredMessages.length === 0 ? (
            <div className="p-12 text-center rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-2">
              <FaInbox className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">No Messages Matching Filter</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No inquiries found matching "{searchMsg}".
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-6 rounded-3xl transition-all border ${
                    msg.status === 'unread'
                      ? 'bg-white dark:bg-slate-900 border-amber-500/40 shadow-md ring-1 ring-amber-500/10'
                      : 'glass-card border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                        {msg.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            {msg.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              msg.status === 'unread'
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200'
                                : msg.status === 'replied'
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {msg.status}
                          </span>
                        </div>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-mono"
                        >
                          {msg.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-[11px] font-mono text-slate-400">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="py-4 space-y-3">
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px]">CATEGORY</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{msg.project_type}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px]">BUDGET</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{msg.budget}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px]">DATABASE RECORD</span>
                        <span className="text-slate-600 dark:text-slate-400">ID #{msg.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${msg.email}?subject=Regarding Your Inquiry: ${msg.project_type}&body=Hello ${msg.name},%0D%0A%0D%0AThank you for reaching out regarding your ${msg.project_type} project.%0D%0A%0D%0ABest regards,%0D%0AHassan Akbar`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 shadow-sm transition"
                      >
                        <FaReply className="text-xs" />
                        <span>Direct Reply via Email</span>
                      </a>

                      <button
                        onClick={() => handleUpdateStatus(msg.id, msg.status === 'replied' ? 'read' : 'replied')}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition cursor-pointer"
                      >
                        <FaCheck className="text-xs" />
                        <span>{msg.status === 'replied' ? 'Mark as Read' : 'Mark as Replied'}</span>
                      </button>

                      {msg.status === 'unread' && (
                        <button
                          onClick={() => handleUpdateStatus(msg.id, 'read')}
                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition cursor-pointer"
                      title="Permanently delete inquiry"
                    >
                      <FaTrash className="text-xs" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* ----------------- TAB 3: PROJECTS MANAGER ----------------- */}
      {/* ========================================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Projects Stored in MySQL
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage, add, and toggle featured projects live in the database.
              </p>
            </div>

            <button
              onClick={() => setShowAddProject(!showAddProject)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 shadow-sm transition cursor-pointer"
            >
              <FaPlus className="text-xs" />
              <span>{showAddProject ? 'Close Form' : 'Add New Project to MySQL'}</span>
            </button>
          </div>

          {/* Add New Project Form Accordion */}
          {showAddProject && (
            <form
              onSubmit={handleCreateProject}
              className="p-6 sm:p-8 rounded-3xl glass-panel border-2 border-cyan-500/40 shadow-xl space-y-4 animate-fadeIn"
            >
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Create New Project Entry
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. AI Content Studio"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Web Apps">Web Apps</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows="3"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Detailed summary of architecture, stack, and features..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-cyan-500 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={newProject.tags}
                    onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                    placeholder="React, MySQL, Node.js, Tailwind"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={newProject.live_demo}
                    onChange={(e) => setNewProject({ ...newProject, live_demo: e.target.value })}
                    placeholder="https://example.vercel.app/"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    placeholder="/project.png or https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Key Metric / Badge
                  </label>
                  <input
                    type="text"
                    value={newProject.metrics}
                    onChange={(e) => setNewProject({ ...newProject, metrics: e.target.value })}
                    placeholder="e.g. 100% Responsive • Sub-100ms Queries"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={newProject.featured}
                  onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                  className="rounded text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="featuredCheck" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Feature this project on the Home page showcase
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingProject}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 shadow-md transition disabled:opacity-50"
                >
                  {submittingProject ? 'Writing to MySQL...' : 'Save Project to Database'}
                </button>
              </div>
            </form>
          )}

          {/* Existing Projects Table / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={proj.image || '/default.png'}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/90 text-cyan-400 border border-cyan-500/30">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1">
                          <FaStar className="w-2.5 h-2.5" /> Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {proj.title}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400">#{proj.id}</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {proj.description}
                    </p>

                    {proj.metrics && (
                      <span className="inline-block text-[10px] font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                        ⚡ {proj.metrics}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleFeatured(proj.id)}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-600 flex items-center gap-1 cursor-pointer"
                  >
                    <FaStar className={proj.featured ? 'text-amber-500' : 'text-slate-400'} />
                    <span>{proj.featured ? 'Unfeature' : 'Feature'}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteProject(proj.id, proj.title)}
                    className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FaTrash className="w-2.5 h-2.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ----------------- TAB 4: DATABASE & DIAGNOSTICS ----------------- */}
      {/* ========================================================================= */}
      {activeTab === 'database' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <FaDatabase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  MySQL Database Architecture
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Database: portfolio_db • Host: 127.0.0.1:3306 • Engine: MariaDB/MySQL
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Table: contacts</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{messages.length}</span>
                <p className="text-[11px] text-slate-500">Stores client inquiries submitted via ContactForm</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Table: projects</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{projects.length}</span>
                <p className="text-[11px] text-slate-500">Stores live full-stack projects & metadata</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Table: subscribers</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">0</span>
                <p className="text-[11px] text-slate-500">Stores newsletter subscriptions</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Connected via connection pooling with 10 max connections.
              </span>
              <a
                href="http://localhost/phpmyadmin/index.php?route=/database/structure&db=portfolio_db"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 transition shadow-sm"
              >
                Inspect Tables in phpMyAdmin →
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
