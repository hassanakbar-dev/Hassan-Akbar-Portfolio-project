import { useState } from 'react'
import { FaExternalLinkAlt, FaGithub, FaCheckCircle, FaChevronDown } from 'react-icons/fa'

export default function ProjectCard({ project }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="glass-card rounded-3xl overflow-hidden flex flex-col group border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300">
      
      {/* Project Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
        
        {/* Category & Metrics Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {project.metrics && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-black/60 text-slate-200 border border-white/10 backdrop-blur-md block truncate">
              ⚡ {project.metrics}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-200 mb-2">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Bullet points toggle */}
          {project.bullets && project.bullets.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer select-none"
              >
                <span>{showDetails ? 'Hide Architecture Highlights' : 'View Architecture Highlights'}</span>
                <FaChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} />
              </button>

              {showDetails && (
                <ul className="mt-2.5 space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                  {project.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-tight">
                      <FaCheckCircle className="text-cyan-600 dark:text-cyan-400 text-[10px] mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
          {project.liveDemo && project.liveDemo !== '#' && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 hover:shadow-cyan-600/35 transition duration-200"
            >
              <FaExternalLinkAlt className="text-xs" />
              <span>Live Demo</span>
            </a>
          )}
          
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition duration-200"
          >
            <FaGithub className="text-sm" />
            <span>View Code</span>
          </a>
        </div>

      </div>
    </div>
  )
}
