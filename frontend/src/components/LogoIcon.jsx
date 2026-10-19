export default function LogoIcon({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-20 h-20 text-2xl',
    xl: 'w-28 h-28 text-3xl',
  }

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Background glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-60 blur-sm group-hover:opacity-100 transition duration-300"></div>
      
      {/* Emblem */}
      <div
        className={`relative ${sizeClasses[size] || sizeClasses.md} rounded-xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white font-mono font-extrabold flex items-center justify-center border border-cyan-500/40 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300`}
      >
        <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent tracking-tighter">
          &lt;HA/&gt;
        </span>
      </div>
    </div>
  )
}
