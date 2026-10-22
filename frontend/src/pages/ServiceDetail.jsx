import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  FaLaptopCode, FaPaintBrush, FaServer, FaRocket, 
  FaBug, FaCloudUploadAlt, FaCheckCircle, FaShieldAlt, 
  FaClock, FaSmile, FaArrowRight, FaArrowLeft, FaChevronDown, 
  FaWhatsapp, FaEnvelope, FaCode, FaCheck, FaQuestionCircle,
  FaLayerGroup
} from 'react-icons/fa'
import { servicesData, personalInfo } from '../data/portfolioData'

const iconMap = {
  FaLaptopCode: FaLaptopCode,
  FaPaintBrush: FaPaintBrush,
  FaServer: FaServer,
  FaRocket: FaRocket,
  FaBug: FaBug,
  FaCloudUploadAlt: FaCloudUploadAlt,
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(0)

  // Find service by slug or numeric id
  const service = servicesData.find(
    (s) => s.slug === slug || String(s.id) === slug
  )

  if (!service) {
    return (
      <div className="pt-36 pb-24 max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 flex items-center justify-center text-red-600 dark:text-red-400">
          <FaQuestionCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Service Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
          We couldn't locate the specific service you are looking for. Please browse our complete service catalog.
        </p>
        <div className="pt-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-xs shadow-md shadow-cyan-600/20 hover:from-cyan-500 hover:to-blue-500 transition"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to All Services</span>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = iconMap[service.icon] || FaLaptopCode

  // Find index for next/previous service
  const currentIndex = servicesData.findIndex((s) => s.id === service.id)
  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : servicesData[servicesData.length - 1]
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : servicesData[0]
  const otherServices = servicesData.filter((s) => s.id !== service.id)

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* ----------------- BREADCRUMB & BACK BUTTON ----------------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-slate-200 dark:border-slate-800/80 pb-4">
        <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">Services</Link>
          <span>/</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-bold truncate max-w-[200px] sm:max-w-none">
            {service.title}
          </span>
        </nav>

        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>All Services</span>
        </Link>
      </div>

      {/* ----------------- SERVICE HERO SECTION ----------------- */}
      <div className="relative rounded-3xl glass-card p-8 sm:p-12 border border-slate-200 dark:border-slate-800 overflow-hidden space-y-8">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/60 shadow-sm">
              <IconComponent className="text-cyan-600 dark:text-cyan-400 text-sm" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                Service Specification #{service.id}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-cyan-600 dark:text-cyan-400 font-medium">
              {service.tagline}
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Quick Metrics Badge Card */}
          <div className="w-full lg:w-80 flex-shrink-0 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
              Engagement Snapshot
            </span>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <FaClock className="text-cyan-500" /> Turnaround:
                </span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{service.turnaround}</span>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <FaShieldAlt className="text-emerald-500" /> Warranty:
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Post-Launch Support</span>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <FaSmile className="text-amber-500" /> Satisfaction:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">100% Guaranteed</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <FaLayerGroup className="text-blue-500" /> Deliverables:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{service.deliverablesList?.length || 5}+ Assets</span>
              </div>
            </div>

            <Link
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 transition cursor-pointer"
            >
              <span>Book This Service</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>

      {/* ----------------- IN-DEPTH DESCRIPTION SECTION ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Full narrative description */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                <FaCode className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                  Comprehensive Overview
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Why This Service Is Critical For Your Web Architecture
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {service.fullDescription.map((paragraph, idx) => (
                <p key={idx} className="first:text-slate-800 first:dark:text-slate-100 first:font-medium">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Philosophy Box */}
            <div className="p-5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/20 border-l-4 border-cyan-500 space-y-1">
              <span className="text-xs font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                Engineering Standard
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                "Clean code isn't just about syntax; it's about building predictable, maintainable digital products that eliminate technical debt and deliver seamless client value."
              </p>
            </div>
          </div>

          {/* Key Architectural Benefits Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Core Strategic Advantages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.keyBenefits?.map((benefit, i) => (
                <div
                  key={i}
                  className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 hover:border-cyan-500/40 transition"
                >
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-cyan-600 dark:text-cyan-400 text-sm flex-shrink-0" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {benefit.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Delivery Lifecycle */}
          <div className="space-y-6 pt-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                Execution Blueprint
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                How We Deliver {service.title}
              </h3>
            </div>

            <div className="space-y-4">
              {service.workflowSteps?.map((wf, idx) => (
                <div
                  key={idx}
                  className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4 transition hover:border-cyan-500/30"
                >
                  <span className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    {wf.step}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {wf.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {wf.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service-Specific FAQs */}
          {service.serviceFaqs && service.serviceFaqs.length > 0 && (
            <div className="space-y-4 pt-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                  Clarifications & Answers
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {service.serviceFaqs.map((faq, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                    >
                      <span>{faq.question}</span>
                      <FaChevronDown
                        className={`text-xs text-cyan-600 dark:text-cyan-400 transition-transform duration-200 ${
                          openFaq === i ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Scope & Deliverables Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* What's Included Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaCheckCircle className="text-cyan-600 dark:text-cyan-400" />
              <span>What's Included in Scope</span>
            </h3>

            <div className="space-y-2.5">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <FaCheck className="text-cyan-600 dark:text-cyan-400 text-xs mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables List Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaLayerGroup className="text-cyan-600 dark:text-cyan-400" />
              <span>Exact Deliverables</span>
            </h3>

            <ul className="space-y-2.5">
              {service.deliverablesList?.map((item, i) => (
                <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Employed */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack?.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Who Is This For */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Target Audience
            </h3>
            <div className="space-y-3 text-xs">
              {service.whoIsThisFor?.map((audience, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                  <strong className="text-slate-900 dark:text-white block font-bold">
                    {audience.title}
                  </strong>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    {audience.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct CTA Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white space-y-4 shadow-xl shadow-cyan-600/20">
            <h3 className="text-lg font-extrabold">Ready to begin this service?</h3>
            <p className="text-xs text-cyan-100 leading-relaxed">
              Let's discuss requirements, milestones, and deliverables. Get in touch directly with Hassan Akbar.
            </p>
            <div className="space-y-2 pt-2">
              <Link
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-sm transition"
              >
                <span>Request Project Consultation</span>
                <FaArrowRight className="text-xs" />
              </Link>
              <a
                href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition"
              >
                <FaWhatsapp className="text-sm" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* ----------------- PREV / NEXT NAVIGATION ----------------- */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to={`/services/${prevService.slug}`}
          className="w-full sm:w-auto inline-flex items-center gap-3 p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition group"
        >
          <FaArrowLeft className="text-cyan-600 dark:text-cyan-400 group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Previous Service</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">
              {prevService.title}
            </span>
          </div>
        </Link>

        <Link
          to="/services"
          className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          View All 6 Services
        </Link>

        <Link
          to={`/services/${nextService.slug}`}
          className="w-full sm:w-auto inline-flex items-center justify-end gap-3 p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition group text-right"
        >
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Next Service</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">
              {nextService.title}
            </span>
          </div>
          <FaArrowRight className="text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ----------------- OTHER SERVICES CARDS ----------------- */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
              Complementary Offerings
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Explore Other Services
            </h3>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
          >
            <span>See All</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherServices.slice(0, 3).map((item) => {
            const ItemIcon = iconMap[item.icon] || FaLaptopCode
            return (
              <div
                key={item.id}
                className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 transition group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <Link
                  to={`/services/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition"
                >
                  <span>Read Description & Specs</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
