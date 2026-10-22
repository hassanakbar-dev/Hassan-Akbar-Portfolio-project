import { useState, useEffect } from 'react'

/**
 * TypewriterText Component
 * Animates text character by character on page load/refresh.
 *
 * @param {string} text - The target string to type out (e.g. "Hassan Akbar")
 * @param {number} speed - Milliseconds per character while typing (default 90ms)
 * @param {number} initialDelay - Milliseconds before typing starts on page load (default 250ms)
 * @param {boolean} loop - Whether to loop continuously (pause, delete, retype). Default: false (types on load/refresh)
 * @param {number} pauseDelay - Milliseconds to pause when text is fully typed before deleting (if loop=true)
 * @param {number} deleteSpeed - Milliseconds per character while deleting (if loop=true)
 * @param {string} className - Classes applied to the typed text span
 * @param {string} cursorClassName - Additional classes applied to the cursor
 * @param {boolean} showCursor - Whether to display the blinking cursor
 * @param {'bar' | 'pipe'} cursorType - Style of cursor: 'bar' (custom styled line) or 'pipe' (| character)
 */
export default function TypewriterText({
  text = '',
  speed = 85,
  initialDelay = 220,
  loop = false,
  pauseDelay = 3000,
  deleteSpeed = 45,
  className = '',
  cursorClassName = '',
  showCursor = true,
  cursorType = 'bar',
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeoutId

    if (!text) return

    // Initial pause before first character appears
    if (displayedText === '' && !isDeleting) {
      timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, 1))
      }, initialDelay)
      return () => clearTimeout(timeoutId)
    }

    if (!isDeleting) {
      if (displayedText.length < text.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1))
        }, speed)
      } else if (loop) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDelay)
      }
    } else {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length - 1))
        }, deleteSpeed)
      } else {
        setIsDeleting(false)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayedText, isDeleting, text, speed, initialDelay, loop, pauseDelay, deleteSpeed])

  return (
    <span className="inline-flex items-center align-baseline">
      <span className={className}>{displayedText}</span>
      {showCursor && (
        cursorType === 'pipe' ? (
          <span
            className={`inline-block font-light text-cyan-600 dark:text-cyan-400 select-none ml-1 animate-cursor-blink ${cursorClassName}`}
            aria-hidden="true"
          >
            |
          </span>
        ) : (
          <span
            className={`inline-block w-[3px] sm:w-[3.5px] lg:w-[4px] h-[0.88em] ml-1.5 align-middle bg-gradient-to-b from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-sm animate-cursor-blink ${cursorClassName}`}
            aria-hidden="true"
          />
        )
      )}
    </span>
  )
}
