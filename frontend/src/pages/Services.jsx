import { Link } from 'react-router-dom'
import { 
  FaLaptopCode, FaPaintBrush, FaServer, FaRocket, 
  FaBug, FaCloudUploadAlt, FaCheckCircle, FaShieldAlt, 
  FaClock, FaSmile, FaCheck, FaArrowRight, FaQuestionCircle 
} from 'react-icons/fa'
import { servicesData, servicePackages, workProcess, personalInfo } from '../data/portfolioData'

const iconMap = {
  FaLaptopCode: FaLaptopCode,
  FaPaintBrush: FaPaintBrush,
  FaServer: FaServer,
  FaRocket: FaRocket,
  FaBug: FaBug,
  FaCloudUploadAlt: FaCloudUploadAlt,
}

export default function Services() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      
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
      </div>

      {/* Services Grid (All 6 core services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service) => {
          const IconComponent = iconMap[service.icon] || FaLaptopCode
          return (
            <div
              key={service.id}
              className="glass-card p-8 rounded-3xl flex flex-col justify-between border border-slate-200 dark:border-slate-800"
            >
              <div>
                <Link to={`/services/${service.slug}`} className="block w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6 hover:scale-105 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </Link>
                
                <Link to={`/services/${service.slug}`} className="group/title block mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 transition flex items-center justify-between">
                    <span>{service.title}</span>
                    <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 text-cyan-600 dark:text-cyan-400 transition-all duration-200" />
                  </h3>
                </Link>
                
                {/* Clickable Description opening dedicated new page */}
                <Link
                  to={`/services/${service.slug}`}
                  className="block group/desc mb-5 p-3 -mx-3 rounded-2xl hover:bg-cyan-50/60 dark:hover:bg-cyan-950/25 transition border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800/50 cursor-pointer"
                  title="Click to read full description and specifications on a new page"
                >
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 mt-2 group-hover/desc:underline">
                    <span>Read Full Description on New Page</span>
                    <FaArrowRight className="text-[10px] group-hover/desc:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 mb-6">
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-semibold block mb-1">
                    What's Included:
                  </span>
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <FaCheckCircle className="text-cyan-600 dark:text-cyan-400 text-sm mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Typical Turnaround:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{service.turnaround}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-700 dark:text-slate-300">Deliverables: </strong>
                    {service.deliverables}
                  </div>
                </div>
              </div>

              <div className="pt-6 grid grid-cols-2 gap-3">
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 border border-cyan-200 dark:border-cyan-800/60 transition text-center"
                >
                  Full Details →
                </Link>
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition text-center"
                >
                  Request Quote →
                </Link>
              </div>
            </div>
          )
        })}
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
