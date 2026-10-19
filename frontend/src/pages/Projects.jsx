import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaLaptopCode, FaRocket, FaSearch, FaCode, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { projectsData } from '../data/portfolioData'
import ProjectCard from '../components/ProjectCard'

const categories = ['All', 'Full-Stack', 'Frontend', 'Web Apps']

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase()
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
          Portfolio & Engineering Showcase
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Featured <span className="text-gradient-cyan">Projects</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Explore a comprehensive selection of production full-stack web applications, interactive web tools, and responsive frontends. Each project features clean code architecture, live deployment on Vercel, and open-source GitHub repositories.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by technology (e.g., React, MySQL, Node, API)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-sm shadow-sm transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/25'
                  : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          Showing <strong className="text-slate-800 dark:text-slate-200">{filteredProjects.length}</strong> of{' '}
          <strong>{projectsData.length}</strong> total projects
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center rounded-3xl max-w-lg mx-auto space-y-3">
          <FaCode className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Projects Found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            No projects matched your search "{searchQuery}". Try searching for React, MySQL, Node, or select "All".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All') }}
            className="mt-2 px-5 py-2 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/60"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Callout */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-4 max-w-4xl mx-auto mt-16 border border-slate-200 dark:border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto">
          <FaRocket className="w-5 h-5" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Need a Custom Full-Stack Project Built?</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          Whether you need an MVP launched in days or an enterprise web application engineered with custom specifications, I'm here to bring your vision to life with clean code and high performance.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-block px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/25 transition cursor-pointer"
          >
            Discuss Your Project Requirements
          </Link>
        </div>
      </div>

    </div>
  )
}
