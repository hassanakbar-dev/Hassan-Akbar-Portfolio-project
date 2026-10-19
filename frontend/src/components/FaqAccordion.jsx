import { useState } from 'react'
import { FaPlus, FaCheck, FaQuestionCircle } from 'react-icons/fa'

export default function FaqAccordion({ faqs, defaultOpenId = 1, showExpandAll = false }) {
  const [openIds, setOpenIds] = useState(defaultOpenId ? [defaultOpenId] : [])

  const toggle = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (openIds.length === faqs.length) {
      setOpenIds([])
    } else {
      setOpenIds(faqs.map((f) => f.id))
    }
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {showExpandAll && faqs.length > 1 && (
        <div className="flex justify-end pb-2">
          <button
            onClick={toggleAll}
            className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60"
          >
            {openIds.length === faqs.length ? '− Collapse All Questions' : '+ Expand All Questions'}
          </button>
        </div>
      )}

      {faqs.map((faq) => {
        const isOpen = openIds.includes(faq.id)

        return (
          <div
            key={faq.id}
            className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
              isOpen
                ? 'bg-white dark:bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/20'
                : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
            }`}
          >
            {/* Header row / Trigger Button */}
            <button
              onClick={() => toggle(faq.id)}
              className="w-full text-left py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer group select-none transition-colors"
              aria-expanded={isOpen}
              id={`faq-btn-${faq.id}`}
              aria-controls={`faq-answer-${faq.id}`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <span
                  className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 transition-colors ${
                    isOpen
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                  }`}
                >
                  {String(faq.id).padStart(2, '0')}
                </span>

                <span
                  className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 ${
                    isOpen
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                  }`}
                >
                  {faq.question}
                </span>
              </div>

              {/* + (Plus) Button with Smooth 45-degree rotation into x */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 border ${
                  isOpen
                    ? 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white border-transparent shadow-md shadow-cyan-600/30 rotate-45'
                    : 'bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/40 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:border-cyan-400/40 rotate-0'
                }`}
                aria-label={isOpen ? 'Close answer' : 'Open answer'}
              >
                <FaPlus className="w-3.5 h-3.5 transition-transform duration-300" />
              </div>
            </button>

            {/* Smooth Animated Grid Accordion Container */}
            <div
              id={`faq-answer-${faq.id}`}
              role="region"
              aria-labelledby={`faq-btn-${faq.id}`}
              className={`accordion-content ${isOpen ? 'open' : ''}`}
            >
              <div className="accordion-inner">
                <div className="px-5 sm:px-6 pb-6 pt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-1">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
                      <FaCheck className="w-2.5 h-2.5" />
                    </div>
                    <p className="flex-1 text-slate-600 dark:text-slate-300">
                      {faq.answer}
                    </p>
                  </div>

                  {faq.category && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                        Topic: {faq.category}
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400">
                        Verified by Hassan Akbar
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
