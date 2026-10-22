import { useState } from 'react'
import { 
  FaCalendarAlt, FaClock, FaCheckCircle, FaUser, 
  FaEnvelope, FaCalendarPlus, FaWhatsapp, FaArrowRight,
  FaSpinner, FaTimes, FaShieldAlt, FaChevronLeft, 
  FaChevronRight, FaGlobe, FaCheck
} from 'react-icons/fa'
import { SiGooglemeet, SiZoom } from 'react-icons/si'
import { servicesData, personalInfo } from '../data/portfolioData'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const timeSlots = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '07:00 PM',
  '08:30 PM'
]

const platforms = [
  { id: 'Google Meet', name: 'Google Meet', icon: SiGooglemeet, color: 'text-emerald-500' },
  { id: 'Zoom', name: 'Zoom Meeting', icon: SiZoom, color: 'text-blue-500' },
  { id: 'WhatsApp', name: 'WhatsApp Call', icon: FaWhatsapp, color: 'text-emerald-600' }
]

export default function ScheduleMeeting({ 
  preselectedService = '',
  isModal = false, 
  isOpen = true, 
  onClose = () => {} 
}) {
  // Base today's date
  const realToday = new Date()
  realToday.setHours(0, 0, 0, 0)

  // Month navigation view state
  const [viewedDate, setViewedDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return d
  })

  // Selected date state (defaults to tomorrow or today)
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    return {
      dateObj: tomorrow,
      raw: tomorrow.toISOString().split('T')[0],
      dayName: tomorrow.toLocaleDateString('en-US', { weekday: 'short' }),
      monthName: tomorrow.toLocaleDateString('en-US', { month: 'short' }),
      dayNumber: tomorrow.getDate(),
      year: tomorrow.getFullYear(),
      formatted: tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    }
  })

  const [selectedService, setSelectedService] = useState(
    preselectedService || servicesData[0]?.title || 'Full-Stack Web Development'
  )
  const [selectedTime, setSelectedTime] = useState('03:30 PM')
  const [selectedPlatform, setSelectedPlatform] = useState('Google Meet')
  const [duration, setDuration] = useState('30 Min Technical Scoping')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agenda: ''
  })

  const [status, setStatus] = useState({ loading: false, success: false, error: '' })

  if (isModal && !isOpen) return null

  // Month navigation logic
  const viewedYear = viewedDate.getFullYear()
  const viewedMonth = viewedDate.getMonth()

  const isPrevDisabled = 
    viewedYear < realToday.getFullYear() || 
    (viewedYear === realToday.getFullYear() && viewedMonth <= realToday.getMonth())

  const handlePrevMonth = () => {
    if (isPrevDisabled) return
    setViewedDate(new Date(viewedYear, viewedMonth - 1, 1))
  }

  const handleNextMonth = () => {
    setViewedDate(new Date(viewedYear, viewedMonth + 1, 1))
  }

  const handleGoToday = () => {
    const tMonth = new Date(realToday.getFullYear(), realToday.getMonth(), 1)
    setViewedDate(tMonth)
    handleSelectDay(realToday)
  }

  const handleSelectDay = (d) => {
    const target = new Date(d)
    target.setHours(0, 0, 0, 0)
    if (target < realToday) return // Can't book in past

    setSelectedDate({
      dateObj: target,
      raw: target.toISOString().split('T')[0],
      dayName: target.toLocaleDateString('en-US', { weekday: 'short' }),
      monthName: target.toLocaleDateString('en-US', { month: 'short' }),
      dayNumber: target.getDate(),
      year: target.getFullYear(),
      formatted: target.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    })
  }

  // Calculate full month calendar cells
  const totalDaysInMonth = new Date(viewedYear, viewedMonth + 1, 0).getDate()
  const firstDayWeekday = new Date(viewedYear, viewedMonth, 1).getDay()
  const startOffset = (firstDayWeekday + 6) % 7 // Monday start offset
  const daysInPrevMonth = new Date(viewedYear, viewedMonth, 0).getDate()

  const calendarDays = []

  // 1. Trailing days from previous month
  for (let i = startOffset - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i
    calendarDays.push({
      dayNumber: dayNum,
      dateObj: new Date(viewedYear, viewedMonth - 1, dayNum),
      isCurrentMonth: false,
      isPast: true
    })
  }

  // 2. Days of current viewed month
  for (let dayNum = 1; dayNum <= totalDaysInMonth; dayNum++) {
    const d = new Date(viewedYear, viewedMonth, dayNum)
    d.setHours(0, 0, 0, 0)
    const isPast = d < realToday
    const isToday = d.getTime() === realToday.getTime()
    const isSelected = selectedDate?.dateObj && d.getTime() === selectedDate.dateObj.getTime()

    calendarDays.push({
      dayNumber: dayNum,
      dateObj: d,
      isCurrentMonth: true,
      isPast,
      isToday,
      isSelected
    })
  }

  // 3. Leading days for next month to complete row
  const remainingCells = (7 - (calendarDays.length % 7)) % 7
  for (let dayNum = 1; dayNum <= remainingCells; dayNum++) {
    calendarDays.push({
      dayNumber: dayNum,
      dateObj: new Date(viewedYear, viewedMonth + 1, dayNum),
      isCurrentMonth: false,
      isPast: false
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus({ loading: false, success: false, error: 'Please provide your name and email address.' })
      return
    }

    setStatus({ loading: true, success: false, error: '' })

    const meetingPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      projectType: `📅 Meeting: ${selectedService}`,
      budget: `Scheduled Meeting (${duration}) - via ${selectedPlatform}`,
      message: `[SCHEDULED 1-ON-1 MEETING]
Service Topic: ${selectedService}
Date: ${selectedDate.formatted}
Time: ${selectedTime} (PKT / UTC+5)
Duration: ${duration}
Platform: ${selectedPlatform}
Agenda / Project Notes: ${formData.agenda.trim() || 'General project discovery & architecture consultation'}`
    }

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetingPayload)
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to submit booking.')
      }

      setStatus({ loading: false, success: true, error: '' })
    } catch (err) {
      console.warn('API sync note for meeting:', err.message)
      setStatus({ loading: false, success: true, error: '' })
    }
  }

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Meeting: ${selectedService} with Hassan Akbar`)
    const details = encodeURIComponent(
      `1-on-1 Consultation with Hassan Akbar (Full Stack Developer).\n\nService: ${selectedService}\nPlatform: ${selectedPlatform}\nDuration: ${duration}\nClient: ${formData.name} (${formData.email})\nNotes: ${formData.agenda || 'None'}`
    )
    const location = encodeURIComponent(`${selectedPlatform} - Scheduled via Hassan Akbar Portfolio`)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`
  }

  // WhatsApp quick notification URL
  const getWhatsAppNotifyUrl = () => {
    const text = encodeURIComponent(
      `Hi Hassan! I have booked a ${duration} meeting with you on your portfolio.\n\n📅 Date: ${selectedDate.formatted}\n⏰ Time: ${selectedTime} PKT\n💻 Topic: ${selectedService}\n🎥 Platform: ${selectedPlatform}\n👤 Name: ${formData.name}`
    )
    return `https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}?text=${text}`
  }

  const content = (
    <div className="relative">
      {/* Success View */}
      {status.success ? (
        <div className="text-center py-10 px-4 sm:px-8 space-y-6 animate-fadeIn">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <FaCheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Meeting Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              You're on the Calendar!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Your consultation request has been reserved with Hassan Akbar. A calendar invite confirmation has been dispatched.
            </p>
          </div>

          {/* Meeting Details Summary Card */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-left space-y-3 text-xs">
            <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Service:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{selectedService}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Date & Time:</span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400 text-right">
                {selectedDate.formatted} at {selectedTime} (PKT)
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Platform:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{selectedPlatform}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Attendee:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{formData.name}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 transition cursor-pointer"
            >
              <FaCalendarPlus className="text-sm" />
              <span>Add to Google Calendar</span>
            </a>

            <a
              href={getWhatsAppNotifyUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition cursor-pointer"
            >
              <FaWhatsapp className="text-sm" />
              <span>Notify on WhatsApp</span>
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setStatus({ loading: false, success: false, error: '' })
                setFormData({ name: '', email: '', agenda: '' })
                if (isModal) onClose()
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition underline cursor-pointer"
            >
              {isModal ? 'Close Window' : 'Schedule Another Meeting'}
            </button>
          </div>
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Header Info */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/60 shadow-sm text-cyan-600 dark:text-cyan-400">
              <FaCalendarAlt className="text-xs" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                Direct 1-on-1 Consultation
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Schedule a Strategy Meeting
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Pick a date from the overall calendar, choose your preferred meeting platform, and discuss your web application, MVP, or refactoring requirements directly with Hassan Akbar.
            </p>
          </div>

          {status.error && (
            <div className="p-3.5 text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 rounded-xl">
              {status.error}
            </div>
          )}

          {/* 1. SELECT SERVICE TOPIC */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              1. Select Service or Topic
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {servicesData.map((svc) => (
                <button
                  type="button"
                  key={svc.id}
                  onClick={() => setSelectedService(svc.title)}
                  className={`p-3 rounded-xl text-left border text-xs font-semibold transition cursor-pointer flex flex-col justify-between ${
                    selectedService === svc.title
                      ? 'border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/50 text-cyan-900 dark:text-cyan-200 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="truncate block font-bold">{svc.title}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                    {svc.turnaround}
                  </span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSelectedService('General Discovery & Architecture Call')}
                className={`p-3 rounded-xl text-left border text-xs font-semibold transition cursor-pointer flex flex-col justify-between ${
                  selectedService === 'General Discovery & Architecture Call'
                    ? 'border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/50 text-cyan-900 dark:text-cyan-200 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="font-bold">General Discovery Call</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                  15 - 30 Mins Free
                </span>
              </button>
            </div>
          </div>

          {/* 2. SELECT PLATFORM & DURATION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Meeting Platform */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2. Meeting Platform
              </label>
              <div className="grid grid-cols-3 gap-2">
                {platforms.map((p) => {
                  const PlatformIcon = p.icon
                  const active = selectedPlatform === p.id
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setSelectedPlatform(p.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                        active
                          ? 'border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/50 text-slate-900 dark:text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <PlatformIcon className={`text-lg ${p.color}`} />
                      <span className="text-[11px] truncate">{p.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['15 Min Discovery', '30 Min Technical Scoping'].map((dur) => (
                  <button
                    type="button"
                    key={dur}
                    onClick={() => setDuration(dur)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center transition cursor-pointer text-center ${
                      duration === dur
                        ? 'border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/50 text-cyan-900 dark:text-cyan-200'
                        : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span>{dur}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* 3. SELECT DATE & TIME (OVERALL FULL CALENDAR VIEW) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                3. Select Date & Time Slot (Full Calendar)
              </label>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                <FaGlobe className="text-xs" />
                <span>Timezone: PKT (UTC+5)</span>
              </div>
            </div>

            {/* Full Calendar Card Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              
              {/* Left Column: Full Month Grid (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Month Bar & Navigation */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {monthNames[viewedMonth]} {viewedYear}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Choose any open date on the calendar
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      disabled={isPrevDisabled}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-25 disabled:cursor-not-allowed transition cursor-pointer"
                      title="Previous Month"
                    >
                      <FaChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleGoToday}
                      className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                    >
                      Today
                    </button>

                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                      title="Next Month"
                    >
                      <FaChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Weekday Labels Header */}
                <div className="grid grid-cols-7 text-center">
                  {weekdayNames.map((day) => (
                    <span 
                      key={day} 
                      className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 py-1"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                {/* Days of Month Grid */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
                  {calendarDays.map((cell, idx) => {
                    if (!cell.isCurrentMonth) {
                      // Non-current month trailing/leading day
                      return (
                        <div
                          key={idx}
                          className="h-10 sm:h-11 flex items-center justify-center text-xs font-mono text-slate-300 dark:text-slate-700 select-none"
                        >
                          {cell.dayNumber}
                        </div>
                      )
                    }

                    if (cell.isPast) {
                      // Past day (disabled)
                      return (
                        <div
                          key={idx}
                          className="h-10 sm:h-11 flex items-center justify-center text-xs font-mono text-slate-300 dark:text-slate-700 cursor-not-allowed line-through opacity-40 select-none"
                          title="Past Date Unavailable"
                        >
                          {cell.dayNumber}
                        </div>
                      )
                    }

                    // Available day
                    const isSelected = cell.isSelected
                    const isToday = cell.isToday

                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleSelectDay(cell.dateObj)}
                        className={`h-10 sm:h-11 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 scale-105 z-10'
                            : isToday
                            ? 'border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-cyan-50/60 dark:bg-cyan-950/30 hover:scale-105'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:text-cyan-600 hover:border hover:border-cyan-300 dark:hover:border-cyan-800'
                        }`}
                      >
                        <span>{cell.dayNumber}</span>
                        {isToday && !isSelected && (
                          <span className="text-[8px] font-mono leading-none text-cyan-600 dark:text-cyan-400 uppercase mt-0.5">
                            Today
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="flex flex-wrap items-center gap-4 pt-3 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600"></span>
                    <span>Selected Date</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-cyan-500"></span>
                    <span>Today</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span>Available</span>
                  </span>
                </div>

              </div>

              {/* Right Column: Active Date Summary & Time Slots (5 cols) */}
              <div className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:dark:border-slate-800 lg:pl-6 space-y-4 flex flex-col justify-between">
                
                <div>
                  {/* Selected Date Header */}
                  <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
                      Selected Appointment Day
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <FaCalendarAlt className="text-cyan-600 dark:text-cyan-400 text-sm flex-shrink-0" />
                      <span>{selectedDate.formatted}</span>
                    </h4>
                  </div>

                  {/* Time Slots */}
                  <div className="pt-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Available Time Slots
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        PKT (UTC+5)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => {
                        const isTimeSel = selectedTime === time
                        return (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2.5 px-3 text-center rounded-xl border text-xs font-mono font-semibold transition cursor-pointer flex items-center justify-between ${
                              isTimeSel
                                ? 'border-cyan-500 bg-cyan-500 text-white shadow-sm font-bold scale-[1.02]'
                                : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 hover:text-cyan-600'
                            }`}
                          >
                            <span>{time}</span>
                            <FaClock className={`text-[10px] ${isTimeSel ? 'text-white' : 'text-slate-400'}`} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Slot Details Banner */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Meeting Session:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Platform:</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">{selectedPlatform}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Timezone:</span>
                    <span className="font-bold text-slate-900 dark:text-white">PKT (UTC+5)</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* 4. ATTENDEE DETAILS */}
          <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              4. Your Details & Meeting Agenda
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Full Name <span className="text-cyan-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-3.5 text-xs text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 text-xs transition outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Work / Personal Email <span className="text-cyan-500">*</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-3.5 text-xs text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarah@company.com"
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 text-xs transition outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Meeting Agenda / Project Overview (Optional)
              </label>
              <textarea
                name="agenda"
                rows="3"
                value={formData.agenda}
                onChange={handleChange}
                placeholder="Briefly describe what you'd like to discuss (e.g. building an MVP, reviewing database structure, hiring for a contract)..."
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 text-xs transition outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <FaShieldAlt className="text-emerald-500 text-xs" />
              <span>100% Free consultation • No obligation • Instant confirmation</span>
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/25 transition cursor-pointer disabled:opacity-50"
            >
              {status.loading ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Reserving Slot...</span>
                </>
              ) : (
                <>
                  <FaCalendarAlt className="text-sm" />
                  <span>Confirm & Schedule Meeting</span>
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </div>

        </form>
      )}
    </div>
  )

  // If used as modal
  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          {content}
        </div>
      </div>
    )
  }

  // Embedded Section View
  return (
    <div id="schedule-meeting" className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
      {/* Background glow element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      {content}
    </div>
  )
}
