import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaQuestionCircle, FaComments, FaSearch, FaShieldAlt, 
  FaClock, FaCodeBranch, FaCheckCircle, FaEnvelope, FaWhatsapp 
} from 'react-icons/fa'
import { faqsData, personalInfo } from '../data/portfolioData'
import FaqAccordion from '../components/FaqAccordion'

export default function Faq() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Extract distinct categories
  const categories = useMemo(() => {
    const cats = ['All']
    faqsData.forEach((f) => {
      if (f.category && !cats.includes(f.category)) {
        cats.push(f.category)
      }
    })
    return cats
  }, [])

  // Filter faqs by search & category
  const filteredFaqs = useMemo(() => {
    return faqsData.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 shadow-sm">
          <FaQuestionCircle className="text-cyan-600 dark:text-cyan-400 text-xs" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
            Frequently Asked Questions & Answers
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Clear Answers to <span className="text-gradient-cyan">Every Question</span>
        </h1>
        
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Everything you need to know about my full-stack engineering process, tech stack, turnaround times, MySQL database architecture, pricing, and project handovers. Click on the <strong className="text-cyan-600 dark:text-cyan-400">+</strong> to view any answer.
        </p>
      </div>

      {/* Trust Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
            <FaClock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Avg Response Time</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">&lt; 12 Hours Guaranteed</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <FaShieldAlt className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Code Ownership</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">100% Full IP Transfer</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
            <FaCodeBranch className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Post-Launch Support</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">14 to 30 Days Free</span>
          </div>
        </div>
      </div>

      {/* Search and Category Filter Section */}
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., tech stack, MySQL, pricing, timeline, SEO)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-sm shadow-sm transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 pt-1">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredFaqs.length}</strong> of{' '}
            <strong>{faqsData.length}</strong> questions
          </span>
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
            Click the (+) button on any row to open
          </span>
        </div>
      </div>

      {/* Accordion Component with interactive + icon */}
      <div className="py-2">
        {filteredFaqs.length > 0 ? (
          <FaqAccordion faqs={filteredFaqs} defaultOpenId={filteredFaqs[0].id} showExpandAll={true} />
        ) : (
          <div className="glass-panel p-12 text-center rounded-3xl max-w-xl mx-auto space-y-3">
            <FaQuestionCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Matching Questions Found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              No results found for "{searchQuery}". Try a different keyword or contact Hassan directly with your question.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
              className="mt-2 px-5 py-2 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/60"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Still have questions? Interactive direct inquiry card */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-6 max-w-3xl mx-auto border border-slate-200 dark:border-slate-800">
        <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto shadow-sm">
          <FaComments className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Have a Specific Question Not Listed Here?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            I am always available to discuss technical architecture, custom project scopes, hourly rates, or full-time opportunities. Reach out through your preferred channel.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/25 transition duration-200 cursor-pointer"
          >
            <FaComments className="text-xs" />
            <span>Open Contact Form</span>
          </Link>

          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-cyan-500/50 shadow-sm transition"
          >
            <FaEnvelope className="text-cyan-600 dark:text-cyan-400 text-xs" />
            <span>Email Hassan Directly</span>
          </a>

          <a
            href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 transition"
          >
            <FaWhatsapp className="text-emerald-600 dark:text-emerald-400 text-xs" />
            <span>WhatsApp Chat</span>
          </a>
        </div>
      </div>

    </div>
  )
}
