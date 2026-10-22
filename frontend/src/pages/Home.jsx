import { Link } from 'react-router-dom'
import { 
  FaArrowRight, FaRocket, FaLaptopCode, FaCheckCircle, 
  FaGithub, FaLinkedin, FaFileDownload, FaStar,
  FaPaintBrush, FaServer, FaBug, FaCloudUploadAlt
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
import TypewriterText from '../components/TypewriterText'

const serviceIconMap = {
  FaLaptopCode: FaLaptopCode,
  FaPaintBrush: FaPaintBrush,
  FaServer: FaServer,
  FaRocket: FaRocket,
  FaBug: FaBug,
  FaCloudUploadAlt: FaCloudUploadAlt,
}

/* Floating Doodle Icons matching the reference design */
function CloudShieldDoodle({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#1e1b4b] dark:text-cyan-400 filter drop-shadow-md" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 46h26a11 11 0 0 0 4-21.2 14.5 14.5 0 0 0-28-4.3A9.5 9.5 0 0 0 19 46z" className="fill-white/95 dark:fill-slate-900/90" />
        <path d="M32 23v14m-5.5-9.5c0 4.5 5.5 8 5.5 8s5.5-3.5 5.5-8v-3.5l-5.5-2-5.5 2v3.5z" strokeWidth="2.2" className="stroke-blue-600 dark:stroke-cyan-300 fill-blue-500/10" />
        <path d="M29.5 29.5l2 2 3.5-3.5" strokeWidth="2" className="stroke-blue-600 dark:stroke-cyan-300" />
      </svg>
    </div>
  )
}

function RocketDoodle({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#1e1b4b] dark:text-cyan-400 -rotate-12 filter drop-shadow-md" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44 14c-7.5-7.5-21-5.5-27 0.5-3.5 3.5-5 9.5-5 15.5l5.5 5.5c6 0 12-1.5 15.5-5 6-6 8-19.5 1-26.5z" className="fill-white/95 dark:fill-slate-900/90" />
        <circle cx="33" cy="23" r="3.5" className="fill-blue-500/20 stroke-blue-600 dark:stroke-cyan-300" strokeWidth="2" />
        <path d="M17 31l-6 4 2 5.5 7.5-2" strokeWidth="2.2" />
        <path d="M31 17l4-6 5.5 2-2 7.5" strokeWidth="2.2" />
        <path d="M15 41l-4 6 6-4" strokeWidth="2.2" className="stroke-amber-500" />
        <path d="M12 47l-3 4 4-2" strokeWidth="1.8" className="stroke-orange-500" />
      </svg>
    </div>
  )
}

function AiLightbulbDoodle({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#1e1b4b] dark:text-cyan-400 filter drop-shadow-md" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 27c0-5.5 4.5-10 10-10s10 4.5 10 10c0 4-2 7-4.5 9v4h-11v-4c-2.5-2-4.5-5-4.5-9z" className="fill-white/95 dark:fill-slate-900/90" />
        <path d="M27.5 44h9M28.5 48h7M30.5 52h3" strokeWidth="2.2" />
        <text x="32" y="31" textAnchor="middle" fontSize="10" fontWeight="900" fill="currentColor" stroke="none" className="font-mono">AI</text>
        <path d="M13 27h-4M51 27h4M32 9V5M19 14l-3-3M45 14l3-3" strokeWidth="2" className="stroke-blue-600 dark:stroke-cyan-300" />
        <circle cx="8" cy="27" r="2" className="fill-blue-600 dark:fill-cyan-300 stroke-none" />
        <circle cx="56" cy="27" r="2" className="fill-blue-600 dark:fill-cyan-300 stroke-none" />
        <circle cx="32" cy="4" r="2" className="fill-blue-600 dark:fill-cyan-300 stroke-none" />
        <circle cx="15" cy="10" r="1.8" className="fill-blue-600 dark:fill-cyan-300 stroke-none" />
        <circle cx="49" cy="10" r="1.8" className="fill-blue-600 dark:fill-cyan-300 stroke-none" />
      </svg>
    </div>
  )
}

function CodeSparkleDoodle({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#1e1b4b] dark:text-cyan-400 rotate-6 filter drop-shadow-md" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="16" width="36" height="32" rx="8" className="fill-white/95 dark:fill-slate-900/90" />
        <path d="M25 28l-4 4 4 4M39 28l4 4-4 4M34 26l-4 12" strokeWidth="2.2" className="stroke-blue-600 dark:stroke-cyan-300" />
        <path d="M50 16l1.5-3.5L55 11l-3.5-1.5L50 6l-1.5 3.5L45 11l3.5 1.5z" strokeWidth="1.8" className="stroke-amber-500 fill-amber-400/30" />
      </svg>
    </div>
  )
}

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
      
      {/* ----------------- HERO SECTION (TWO-COLUMN MODERN LAYOUT) ----------------- */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Undulating Background Wave Curves */}
        <svg 
          className="absolute inset-0 w-full h-[650px] pointer-events-none -z-10 opacity-75 dark:opacity-25" 
          viewBox="0 0 1440 650" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <path d="M-60 140 C 320 280, 680 40, 1050 170 C 1240 230, 1380 120, 1500 150" stroke="currentColor" className="text-slate-300 dark:text-cyan-500/30" strokeWidth="2" />
          <path d="M-60 280 C 260 170, 720 370, 1120 240 C 1280 190, 1420 300, 1500 270" stroke="currentColor" className="text-blue-300/70 dark:text-blue-500/30" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M-60 450 C 380 340, 780 520, 1180 400 C 1340 360, 1450 430, 1500 420" stroke="currentColor" className="text-slate-300/80 dark:text-cyan-400/25" strokeWidth="1.8" />
        </svg>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[360px] bg-gradient-to-tr from-cyan-400/15 via-sky-300/10 to-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 right-10 w-[450px] h-[360px] bg-gradient-to-tr from-blue-500/15 via-cyan-300/15 to-indigo-500/15 blur-[130px] rounded-full pointer-events-none -z-10"></div>

        {/* Two-Column Grid: Left Text, Right Portrait + 4 Circles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 pt-2 lg:pt-6">
          
          {/* ================= LEFT COLUMN: HERO CONTENT & CTAs ================= */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-md shadow-cyan-500/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-mono font-medium text-cyan-700 dark:text-cyan-300">
                {personalInfo.availability}
              </span>
            </div>

            {/* Main Headline & Intro */}
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Hi, I'm{' '}
                <TypewriterText
                  text={personalInfo.name}
                  className="text-gradient-cyan"
                  speed={85}
                  initialDelay={220}
                />
                <br />
                <span className="text-xl sm:text-3xl lg:text-4xl text-slate-700 dark:text-slate-300 font-bold block mt-2.5">
                  Building Resilient Full-Stack Systems
                </span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
                Full-Stack Developer crafting fast, scalable React web applications, robust Node.js/Express REST APIs, and normalized MySQL databases with smooth animations and modern aesthetics.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
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
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
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
                title="TechSphere Solutions Live App"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Live App Demo</span>
              </a>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: PORTRAIT + 4 CORNER CIRCLES + SUBTLE BACKDROP ================= */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] select-none py-4">
            
            {/* 4 Floating Outline Doodles (2 Top, 2 Bottom around Image) */}
            <CloudShieldDoodle className="absolute -top-1 left-2 sm:left-6 animate-float-slow z-20" />
            <AiLightbulbDoodle className="absolute -top-1 right-2 sm:right-6 animate-float-reverse z-20" />
            <RocketDoodle className="absolute bottom-8 left-2 sm:left-6 animate-float-delayed z-20" />
            <CodeSparkleDoodle className="absolute bottom-8 right-2 sm:right-6 animate-float-slow z-20" />

            {/* Ambient Studio Backlight Glow behind Portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-[380px] h-64 sm:h-80 md:h-[380px] bg-gradient-to-tr from-cyan-400/25 via-sky-300/20 to-blue-600/25 rounded-full blur-3xl pointer-events-none z-0"></div>


            {/* Cutout Portrait (Foreground z-10) */}
            <div className="relative z-10 flex flex-col items-center pointer-events-none">
              <img
                src="/hassan.png"
                alt={personalInfo.name}
                className="h-[290px] sm:h-[380px] md:h-[430px] lg:h-[460px] xl:h-[490px] w-auto max-w-none object-contain drop-shadow-[0_20px_35px_rgba(2,132,199,0.3)] transition-transform duration-300 select-none"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 86%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 86%, transparent 100%)'
                }}
              />

              {/* Verification badge placed directly at Hassan's baseline */}
              <div className="pointer-events-auto -mt-6 z-30 whitespace-nowrap px-4 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-cyan-500/30 shadow-lg text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <span>Full-Stack Web Developer • React & MySQL</span>
              </div>
            </div>

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
          {servicesData.slice(0, 3).map((service) => {
            const ServiceIcon = serviceIconMap[service.icon] || FaLaptopCode
            return (
              <div
                key={service.id}
                className="glass-card p-8 rounded-3xl flex flex-col justify-between"
              >
                <div>
                  <Link to={`/services/${service.slug}`} className="block w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6 hover:scale-105 transition-transform">
                    <ServiceIcon className="w-5 h-5" />
                  </Link>
                  
                  <Link to={`/services/${service.slug}`} className="group/title block mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 transition flex items-center justify-between">
                      <span>{service.title}</span>
                      <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 text-cyan-600 dark:text-cyan-400 transition-all duration-200" />
                    </h3>
                  </Link>
                  
                  {/* Clickable Description to new page */}
                  <Link
                    to={`/services/${service.slug}`}
                    className="block group/desc mb-5 p-2.5 -mx-2.5 rounded-xl hover:bg-cyan-50/60 dark:hover:bg-cyan-950/25 transition border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800/50 cursor-pointer"
                    title="Click to read full description on a new page"
                  >
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 mt-2 group-hover/desc:underline">
                      <span>Read Description on New Page</span>
                      <FaArrowRight className="text-[10px] group-hover/desc:translate-x-1 transition-transform" />
                    </span>
                  </Link>

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
                    to={`/services/${service.slug}`}
                    className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1"
                  >
                    Full Details <span>→</span>
                  </Link>
                </div>
              </div>
            )
          })}
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
