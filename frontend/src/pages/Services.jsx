import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaLaptopCode, FaPaintBrush, FaServer, FaRocket, 
  FaBug, FaCloudUploadAlt, FaCheckCircle, FaShieldAlt, 
  FaClock, FaSmile, FaCheck, FaArrowRight, FaQuestionCircle,
  FaCalendarAlt 
} from 'react-icons/fa'
import { servicesData, servicePackages, workProcess, personalInfo } from '../data/portfolioData'
import ScheduleMeeting from '../components/ScheduleMeeting'

const iconMap = {
  FaLaptopCode: FaLaptopCode,
  FaPaintBrush: FaPaintBrush,
  FaServer: FaServer,
  FaRocket: FaRocket,
  FaBug: FaBug,
  FaCloudUploadAlt: FaCloudUploadAlt,
}

export default function Services() {
  const [meetingModalService, setMeetingModalService] = useState(null)
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      
      {/* Schedule Meeting Modal */}
      {meetingModalService && (
        <ScheduleMeeting
          isModal={true}
          isOpen={true}
          preselectedService={meetingModalService}
          onClose={() => setMeetingModalService(null)}
        />
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
          Professional Offerings
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Services & <span className="text-gradient-cyan">Solutions</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          High-standard web development services tailored to deliver speed, aesthetic elegance, and reliable functionality for founders, startups, and established enterprises.
        </p>

        {/* Quick Action Meeting Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setMeetingModalService('General Discovery & Architecture Call')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/25 transition cursor-pointer"
          >
            <FaCalendarAlt className="text-xs" />
            <span>Schedule a Free 1-on-1 Meeting</span>
          </button>
          <a
            href="#schedule-meeting"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-sm transition"
          >
            <span>Book Via Calendar Widget</span>
            <FaArrowRight className="text-[10px] text-cyan-500" />
          </a>
        </div>
      </div>

      {/* Services Grid (All 6 core services) */}
      {/* Services Grid (All 6 core services - compact cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service) => {
          const IconComponent = iconMap[service.icon] || FaLaptopCode
          return (
            <div
              key={service.id}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Link
                    to={`/services/${service.slug}`}
                    className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300"
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                    {service.turnaround}
                  </span>
                </div>
                
                <Link to={`/services/${service.slug}`} className="group/title block mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 transition-colors flex items-center justify-between">
                    <span>{service.title}</span>
                    <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 text-cyan-600 dark:text-cyan-400 transition-all duration-200" />
                  </h3>
                </Link>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {service.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.techStack?.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/70 space-y-2">
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 border border-cyan-200 dark:border-cyan-800/60 transition-all duration-200 group/btn"
                >
                  <span>View Full Description</span>
                  <FaArrowRight className="text-[11px] group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMeetingModalService(service.title)}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:border-cyan-500/50 border border-slate-200 dark:border-slate-800 transition cursor-pointer"
                  >
                    <FaCalendarAlt className="text-cyan-600 dark:text-cyan-400 text-[10px]" />
                    <span>Meeting</span>
                  </button>
                  <Link
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-center py-2 px-2.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition text-center"
                  >
                    Quote →
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ----------------- EMBEDDED SCHEDULE MEETING SECTION ----------------- */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Real-Time Booking
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Schedule a Strategy Session
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Lock in a calendar slot directly with Hassan Akbar to discuss project timelines, tech stacks, or technical challenges.
          </p>
        </div>

        <ScheduleMeeting preselectedService={servicesData[0]?.title} />
      </div>

      {/* ----------------- SERVICE PACKAGES & TIERS ----------------- */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Transparent Engagement
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Service Packages & Options</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Flexible collaboration structures tailored for MVPs, ongoing development, or complete turn-key solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicePackages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.recommended
                  ? 'glass-card border-2 border-cyan-500 shadow-xl shadow-cyan-500/10 relative'
                  : 'glass-card border border-slate-200 dark:border-slate-800'
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 shadow-sm uppercase tracking-wider">
                  Most Popular Choice
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{pkg.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{pkg.tagline}</p>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-6 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Estimated Delivery:</span>
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">{pkg.timeline}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <FaCheck className="text-cyan-600 dark:text-cyan-400 text-xs mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  to="/contact"
                  className={`w-full inline-flex items-center justify-center py-3 px-6 rounded-xl text-xs font-bold transition duration-200 ${
                    pkg.recommended
                      ? 'text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20'
                      : 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Choose {pkg.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- WHY CHOOSE HASSAN SECTION ----------------- */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-10 border border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            The Hassan Akbar Advantage
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Why Work With Me?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <FaShieldAlt className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Clean & Maintainable</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Modular components, documented architecture, and adherence to modern standard conventions and DRY principles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FaClock className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">On-Time Deliverables</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Realistic scheduling, milestone accountability, sprint reviews, and continuous communication throughout.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FaRocket className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Speed & SEO Focus</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every page is audited for lightning-quick load speeds, Google Lighthouse 95+ ratings, and SEO indexing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <FaSmile className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">100% Satisfaction</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Dedicated revisions, live preview links at every stage, and 30-day post-delivery warranty support.
            </p>
          </div>
        </div>
      </div>

      {/* ----------------- 5-STEP LIFECYCLE ----------------- */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Lifecycle
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">From Idea to Production Launch</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {workProcess.map((step) => (
            <div
              key={step.step}
              className="glass-card p-6 rounded-2xl space-y-3 relative overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="text-3xl font-extrabold font-mono text-cyan-600/25 dark:text-cyan-500/30">
                {step.step}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-600/25 transition duration-200 cursor-pointer"
        >
          <span>Get a Custom Quote for Your Project</span>
          <FaArrowRight className="text-xs" />
        </Link>
      </div>

    </div>
  )
}
