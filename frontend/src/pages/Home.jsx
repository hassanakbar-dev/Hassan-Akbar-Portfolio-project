import { Link } from 'react-router-dom'
import { 
  FaArrowRight, FaCode, FaRocket, FaLaptopCode, FaCheckCircle, 
  FaGithub, FaLinkedin, FaFileDownload, FaBriefcase, FaGraduationCap, 
  FaCertificate, FaStar, FaQuoteLeft, FaClock, FaShieldAlt 
} from 'react-icons/fa'
import { 
  SiReact, SiJavascript, SiTailwindcss, SiNodedotjs, 
  SiExpress, SiMysql, SiVercel, SiGit 
} from 'react-icons/si'
import { 
  personalInfo, statsData, projectsData, servicesData, 
  workProcess, faqsData, testimonialsData 
} from '../data/portfolioData'
import ProjectCard from '../components/ProjectCard'
import FaqAccordion from '../components/FaqAccordion'

const techBadges = [
  { name: 'React.js', icon: SiReact, color: 'text-cyan-600 dark:text-cyan-400', role: 'Frontend UI' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-600 dark:text-yellow-400', role: 'ES6+ Logic' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-sky-600 dark:text-sky-400', role: 'Modern Styling' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-emerald-600 dark:text-emerald-400', role: 'Backend Runtime' },
  { name: 'Express.js', icon: SiExpress, color: 'text-slate-700 dark:text-slate-300', role: 'REST APIs' },
  { name: 'MySQL', icon: SiMysql, color: 'text-blue-600 dark:text-blue-400', role: 'Relational DB' },
  { name: 'Vercel', icon: SiVercel, color: 'text-slate-900 dark:text-white', role: 'Cloud Deploy' },
  { name: 'Git & GitHub', icon: SiGit, color: 'text-orange-600 dark:text-orange-500', role: 'Version Control' },
]

export default function Home() {
  const featuredProjects = projectsData.filter((p) => p.featured)

  return (
    <div className="space-y-24 md:space-y-32 pt-28 pb-20 overflow-hidden">
      
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ambient background glows */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 to-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto space-y-7 relative z-10">
          
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-md shadow-cyan-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="text-xs font-mono font-medium text-cyan-700 dark:text-cyan-300">
              {personalInfo.availability}
            </span>
          </div>

          {/* Centered Hero Portrait - Large Cutout */}
          <div className="relative mx-auto w-fit flex flex-col items-center pt-2">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-tr from-cyan-400/25 via-sky-300/20 to-blue-500/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            <div className="relative group flex flex-col items-center">
              <img
                src="/hassan.png"
                alt={personalInfo.name}
                className="w-auto h-64 sm:h-80 md:h-96 max-w-full object-contain drop-shadow-[0_15px_30px_rgba(2,132,199,0.22)] transition-transform duration-300 group-hover:scale-105"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)'
                }}
              />

              {/* Verification badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-cyan-500/30 shadow-lg text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <span>Full-Stack Web Developer • React & MySQL</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4 pt-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Hi, I'm <span className="text-gradient-cyan">{personalInfo.name}</span>
              <br />
              <span className="text-2xl sm:text-4xl lg:text-5xl text-slate-700 dark:text-slate-300 font-bold block mt-3">
                Building Resilient Full-Stack Systems
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Full-Stack Developer crafting fast, scalable React web applications, robust Node.js/Express REST APIs, and normalized MySQL databases with smooth animations and modern aesthetics.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-600/25 hover:-translate-y-0.5 transition duration-200"
            >
              <FaRocket className="text-sm" />
              <span>Explore My Projects</span>
            </Link>

            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 shadow-sm transition duration-200"
              title="Open and Download Resume PDF"
            >
              <FaFileDownload className="text-cyan-600 dark:text-cyan-400 text-sm" />
              <span>Download CV</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition duration-200"
            >
              <span>Get in Touch</span>
              <FaArrowRight className="text-xs text-cyan-600 dark:text-cyan-400" />
            </Link>
          </div>

          {/* Social Proof Links */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm transition"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm transition"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.socials.portfolio}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm transition flex items-center gap-1.5"
              title="Logistics Live App"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Live App Demo</span>
            </a>
          </div>

        </div>
      </section>


      {/* ----------------- METRICS & STATS STRIP ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-2xl text-center space-y-1 hover:border-cyan-500/50 transition group"
            >
              <span className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono block group-hover:scale-105 transition-transform">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                {stat.label}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </section>


      {/* ----------------- TECH STACK BADGES ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Core Technical Toolbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Technologies & Frameworks I Build With
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {techBadges.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.name}
                className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-cyan-500/40 transition duration-200"
              >
                <Icon className={`w-8 h-8 ${tech.color} group-hover:scale-110 transition-transform duration-200`} />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  {tech.role}
                </span>
              </div>
            )
          })}
        </div>
      </section>


      {/* ----------------- FEATURED PROJECTS SHOWCASE ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Proven Engineering Deliverables
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Featured Web Applications
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
              Production-ready web applications built with React, Node.js, Express, and MySQL. Every project features live deployment and public source repositories.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 shadow-sm transition"
          >
            <span>View All {projectsData.length} Projects</span>
            <FaArrowRight className="text-xs text-cyan-600 dark:text-cyan-400" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>


      {/* ----------------- SERVICES GRID ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Professional Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            High-Standard Development Solutions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            From single-page web applications to complete database-backed architectures, I build solutions tailored to your operational needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="glass-card p-8 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6">
                  <FaLaptopCode className="w-5 h-5" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 4).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <FaCheckCircle className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                  Delivery: {service.turnaround}
                </span>
                <Link
                  to="/services"
                  className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1"
                >
                  Details <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-cyan-500/40 shadow-sm transition"
          >
            <span>Explore All 6 Services & Packages</span>
            <FaArrowRight className="text-xs text-cyan-600 dark:text-cyan-400" />
          </Link>
        </div>
      </section>


      {/* ----------------- WORK PROCESS STEPS ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            How I Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            5-Stage Development Lifecycle
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            A structured workflow ensures on-time delivery, crystal-clear communication, and zero surprises from kickoff to cloud launch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {workProcess.map((step) => (
            <div
              key={step.step}
              className="glass-card p-6 rounded-2xl relative overflow-hidden"
            >
              <span className="text-4xl font-black text-cyan-600/20 dark:text-cyan-500/20 font-mono block mb-3">
                {step.step}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* ----------------- TESTIMONIALS SECTION ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Social Proof & Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            What Leads & Collaborators Say
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Feedback from engineering team leads, startup founders, and technical collaborators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item) => (
            <div key={item.id} className="glass-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="w-3.5 h-3.5" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">{item.role} • {item.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ----------------- FAQ SECTION WITH INTERACTIVE + TOGGLE ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Quick Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Click on the <strong className="text-cyan-600 dark:text-cyan-400 font-bold">+</strong> button on any question to view its comprehensive answer.
          </p>
        </div>

        {/* Upgraded FaqAccordion with animated + toggle */}
        <FaqAccordion faqs={faqsData.slice(0, 6)} defaultOpenId={1} showExpandAll={true} />

        <div className="text-center pt-2">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 transition"
          >
            <span>Explore All {faqsData.length} FAQs with Live Search</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>


      {/* ----------------- CTA CALLOUT BANNER ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-900 text-center space-y-6 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight relative z-10">
            Let's Build Something <span className="text-cyan-300">Extraordinary</span> Together.
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto relative z-10">
            Whether you have an upcoming project, need to upgrade your existing codebase, or want to discuss full-time opportunities, my inbox is always open.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-xl transition duration-200"
            >
              Start a Conversation Now
            </Link>
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition duration-200"
            >
              Send Direct Email
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
