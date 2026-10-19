import { FaEnvelope, FaMapMarkerAlt, FaClock, FaGithub, FaLinkedin, FaPhoneAlt, FaWhatsapp, FaShieldAlt, FaComments } from 'react-icons/fa'
import { personalInfo, faqsData } from '../data/portfolioData'
import ContactForm from '../components/ContactForm'
import FaqAccordion from '../components/FaqAccordion'

export default function Contact() {
  const contactFaqs = faqsData.slice(0, 3)

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 shadow-sm">
          <FaComments className="text-cyan-600 dark:text-cyan-400 text-xs" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
            Let's Collaborate
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Let’s Build Something <span className="text-gradient-cyan">Extraordinary</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          I am available for freelance work, remote full-time positions, and consulting. Send a message using the form below or reach out via direct channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Availability Card */}
          <div className="p-6 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-500/30 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Current Availability
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Open for New Projects</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Available immediately for freelance web development contracts, full-stack projects, and long-term developer roles with a guaranteed response time of less than 12 hours.
            </p>
          </div>

          {/* Direct channels */}
          <div className="space-y-3.5">
            
            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-cyan-500/50 transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block uppercase font-semibold">Email Me</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition truncate block">
                  {personalInfo.email}
                </span>
              </div>
            </a>

            {/* WhatsApp / Phone */}
            <a
              href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-emerald-500/50 transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <FaWhatsapp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block uppercase font-semibold">WhatsApp & Phone</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition block">
                  {personalInfo.phone}
                </span>
              </div>
            </a>

            {/* Location */}
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block uppercase font-semibold">Location & Timezone</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  {personalInfo.location} (PKT / UTC+5)
                </span>
              </div>
            </div>

            {/* Fast Turnaround SLA */}
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                <FaClock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block uppercase font-semibold">Response Guarantee</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  Within 12 Hours (Mon - Sun)
                </span>
              </div>
            </div>

          </div>

          {/* Social Profiles */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Connect on Professional Networks
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-white hover:bg-slate-900 dark:hover:bg-slate-800 flex items-center justify-center gap-2 text-xs font-bold transition shadow-2xs"
                title="GitHub Profile"
              >
                <FaGithub className="text-base" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 flex items-center justify-center gap-2 text-xs font-bold transition shadow-2xs"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="text-base" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

        </div>

        {/* Form Container */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </div>

      {/* Quick Answers on Contact Page */}
      <div className="max-w-4xl mx-auto pt-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Quick Inquiries Before Messaging
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Common Collaboration Questions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click the <strong className="text-cyan-600 dark:text-cyan-400">+</strong> to view instant answers.
          </p>
        </div>

        <FaqAccordion faqs={contactFaqs} defaultOpenId={1} />
      </div>

    </div>
  )
}
