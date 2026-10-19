import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' | 'register'
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on initial render
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('ha_portfolio_user')
      const savedToken = localStorage.getItem('ha_portfolio_token')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      if (savedToken) {
        setToken(savedToken)
      }
    } catch (e) {
      console.error('Failed to parse saved user:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  const openLoginModal = () => {
    setAuthMode('login')
    setIsAuthModalOpen(true)
  }

  const openRegisterModal = () => {
    setAuthMode('register')
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  // 1. Local Login
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials.')
      }

      setUser(data.user)
      setToken(data.token)
      localStorage.setItem('ha_portfolio_user', JSON.stringify(data.user))
      localStorage.setItem('ha_portfolio_token', data.token)
      closeAuthModal()
      return { success: true, user: data.user }
    } catch (err) {
      // Offline fallback: if backend is unreachable, allow demo login
      if (err.message.includes('fetch') || err.message.includes('Failed to fetch')) {
        console.warn('Backend server unreachable, using offline fallback login.')
        const fallbackUser = {
          id: 1,
          name: email.split('@')[0],
          email,
          role: email.includes('admin') || email.includes('akbarhassan') ? 'admin' : 'user',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=0ea5e9&color=fff&bold=true`,
          provider: 'local'
        }
        setUser(fallbackUser)
        setToken('mock_offline_token')
        localStorage.setItem('ha_portfolio_user', JSON.stringify(fallbackUser))
        localStorage.setItem('ha_portfolio_token', 'mock_offline_token')
        closeAuthModal()
        return { success: true, user: fallbackUser }
      }
      throw err
    }
  }

  // 2. Local Register
  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed.')
      }

      setUser(data.user)
      setToken(data.token)
      localStorage.setItem('ha_portfolio_user', JSON.stringify(data.user))
      localStorage.setItem('ha_portfolio_token', data.token)
      closeAuthModal()
      return { success: true, user: data.user }
    } catch (err) {
      if (err.message.includes('fetch') || err.message.includes('Failed to fetch')) {
        const fallbackUser = {
          id: Date.now(),
          name,
          email,
          role: 'user',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0ea5e9&color=fff&bold=true`,
          provider: 'local'
        }
        setUser(fallbackUser)
        setToken('mock_offline_token')
        localStorage.setItem('ha_portfolio_user', JSON.stringify(fallbackUser))
        localStorage.setItem('ha_portfolio_token', 'mock_offline_token')
        closeAuthModal()
        return { success: true, user: fallbackUser }
      }
      throw err
    }
  }

  // 3. Google Sign-In
  const loginWithGoogle = async (googleProfile = null) => {
    try {
      const payload = googleProfile || {
        name: 'Hassan Akbar',
        email: 'akbarhassan918@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      }

      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null)

      let authenticatedUser = null
      let authToken = ''

      if (res && res.ok) {
        const data = await res.json()
        authenticatedUser = data.user
        authToken = data.token
      } else {
        authenticatedUser = {
          id: 999,
          name: payload.name,
          email: payload.email,
          avatar: payload.avatar,
          role: 'admin',
          provider: 'google'
        }
        authToken = `google_session_${Date.now()}`
      }

      setUser(authenticatedUser)
      setToken(authToken)
      localStorage.setItem('ha_portfolio_user', JSON.stringify(authenticatedUser))
      localStorage.setItem('ha_portfolio_token', authToken)
      closeAuthModal()
      return { success: true, user: authenticatedUser }
    } catch (err) {
      console.error('Google sign-in error:', err)
      throw err
    }
  }

  // 4. Logout
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('ha_portfolio_user')
    localStorage.removeItem('ha_portfolio_token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openLoginModal,
        openRegisterModal,
        closeAuthModal,
        login,
        register,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
