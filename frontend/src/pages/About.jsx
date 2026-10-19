import { Link } from 'react-router-dom'
import { 
  FaFileDownload, FaCheckCircle, FaLaptopCode, FaServer, FaTools, 
  FaGraduationCap, FaBriefcase, FaCertificate, FaArrowRight, FaCode,
  FaLightbulb, FaShieldAlt, FaRocket, FaTerminal, FaDatabase
} from 'react-icons/fa'
import { 
  personalInfo, skillsData, experienceData, 
  educationData, certificationsData, languagesData, statsData 
} from '../data/portfolioData'

export default function About() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
          Get to Know Me
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About <span className="text-gradient-cyan">Hassan Akbar</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Full-Stack Web Developer dedicated to writing clean, maintainable code, engineering responsive user interfaces, and solving complex real-world digital problems.
        </p>
      </div>

      {/* Bio & Intro Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Visual Brand Profile */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-md">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 opacity-30 blur-lg group-hover:opacity-70 transition duration-500"></div>
            <div className="relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-md">
              <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/20">
                <img 
                  src="/hassan.png" 
                  alt={personalInfo.name} 
                  className="w-full h-full object-cover object-top rounded-xl bg-slate-100 dark:bg-slate-800" 
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{personalInfo.name}</h3>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-1 font-semibold">{personalInfo.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{personalInfo.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Experience</span>
                  <span className="text-slate-900 dark:text-white font-bold text-sm">{personalInfo.experienceYears}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Projects</span>
                  <span className="text-slate-900 dark:text-white font-bold text-sm">{personalInfo.completedProjects} Completed</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 transition duration-200"
                >
                  <FaFileDownload className="text-sm" />
                  <span>Download CV / Resume (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Story */}
        <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              My Engineering Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Driven by curiosity, fueled by clean architecture.
            </h2>
          </div>
          
          <p>
            Hello! I'm <strong className="text-slate-900 dark:text-white">Hassan Akbar</strong>. My journey into web development began with an intense curiosity about how scalable interactive systems operate behind the scenes. Over the years, that passion has translated into engineering high-grade, resilient full-stack applications that combine aesthetic elegance with bulletproof backend logic.
          </p>

          <p>
            I specialize in <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Full-Stack Web Development</span> using React.js (v18/v19) on the client side, Node.js and Express.js on the server, and normalized <span className="text-cyan-600 dark:text-cyan-400 font-semibold">MySQL</span> databases for structured data storage. For styling, I leverage <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Tailwind CSS</span> to build responsive, accessible, and animated interfaces that captivate users across every screen resolution.
          </p>

          <p>
            During my 5-month on-site internship at <strong className="text-slate-800 dark:text-slate-200">Bits Phile (Pvt)</strong>, I worked directly on commercial web applications, designing RESTful APIs, authoring complex SQL queries, and refactoring front-end component hierarchies. I practice test-driven thinking, maintain strict version control standards on GitHub, and augment my workflow with state-of-the-art AI reasoning models (Gemini, Claude, DeepSeek).
          </p>

          {/* Core Pillars */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-cyan-600 dark:text-cyan-400 text-base mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold text-sm">Performance Mindset</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Lightweight bundles, sub-100ms API responses, and 95+ Core Web Vitals.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-cyan-600 dark:text-cyan-400 text-base mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold text-sm">Clean & Modular Code</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Adhering to DRY, readable architecture, and decoupled components.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-cyan-600 dark:text-cyan-400 text-base mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold text-sm">Mobile-First UI</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">100% responsive fluid layouts across smartphones, tablets, and desktops.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-cyan-600 dark:text-cyan-400 text-base mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold text-sm">Relational Integrity</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Normalized MySQL schemas, foreign key constraints, and indexing.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ----------------- COMPREHENSIVE SKILLS SECTION ----------------- */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Technical Proficiency
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Comprehensive Skills Matrix
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Categorized technical capabilities honed through practical project execution, academic studies, and industry internship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.category}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-slate-200 dark:border-slate-800"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span>{category.category}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400 text-[11px]">{skill.level}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                          style={{ width: skill.level }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- PROFESSIONAL EXPERIENCE SECTION ----------------- */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Career Timeline
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Practical Work Experience
          </h2>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                  <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{exp.company}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{exp.location}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                    {exp.period} ({exp.duration})
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {exp.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Key Responsibilities & Engineering Highlights:
                </h4>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <FaCheckCircle className="text-cyan-600 dark:text-cyan-400 text-xs mt-1 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {exp.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- EDUCATION & CERTIFICATIONS ----------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Education */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-cyan-600 dark:text-cyan-400 text-xl" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Formal Education</h3>
          </div>

          <div className="space-y-4">
            {educationData.map((edu) => (
              <div key={edu.id} className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                    <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">{edu.institution}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {edu.description}
                </p>
                {edu.highlights && (
                  <ul className="space-y-1 pt-1">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <FaCertificate className="text-cyan-600 dark:text-cyan-400 text-xl" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Industry Certifications</h3>
          </div>

          <div className="space-y-4">
            {certificationsData.map((cert) => (
              <div key={cert.id} className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{cert.title}</h4>
                    <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">{cert.issuer} • {cert.type}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    {cert.date}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-300">Competencies: </strong>
                  {cert.skills}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ----------------- LANGUAGES ----------------- */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Languages & Communication</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {languagesData.map((lang, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-sm font-bold text-slate-900 dark:text-white block">{lang.language}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">{lang.level}</span>
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
          <span>Get in Touch for Opportunities</span>
          <FaArrowRight className="text-xs" />
        </Link>
      </div>

    </div>
  )
}
