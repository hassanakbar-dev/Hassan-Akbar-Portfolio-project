import { getDbPool, isDbConnected } from '../config/db.js'

// In-memory fallback users in case MySQL is offline
const memoryUsers = [
  {
    id: 1,
    name: 'Hassan Akbar',
    email: 'akbarhassan918@gmail.com',
    password: 'password123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    provider: 'local',
    created_at: new Date().toISOString()
  }
]

export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.'
      })
    }

    const cleanEmail = email.trim().toLowerCase()

    if (isDbConnected) {
      const pool = getDbPool()
      const [rows] = await pool.query('SELECT * FROM users WHERE LOWER(email) = ?', [cleanEmail])

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'No account found with this email. Please click "Create Account / Register" to sign up.'
        })
      }

      const user = rows[0]
      if (user.password && user.password !== password) {
        return res.status(401).json({
          success: false,
          error: 'Invalid password. Please check your credentials.'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'user',
          avatar: user.avatar,
          provider: user.provider || 'local'
        },
        token: `token_${user.id}_${Date.now()}`
      })
    } else {
      // Memory fallback
      const user = memoryUsers.find((u) => u.email.toLowerCase() === cleanEmail)
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'No account found with this email. Please click "Create Account / Register" to sign up.'
        })
      }

      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          error: 'Invalid password. Please try again.'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Login successful (local session)!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          provider: user.provider
        },
        token: `mock_token_${user.id}`
      })
    }
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred during login.'
    })
  }
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are all required.'
      })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName = name.trim()

    if (isDbConnected) {
      const pool = getDbPool()
      const [existing] = await pool.query('SELECT id FROM users WHERE LOWER(email) = ?', [cleanEmail])

      if (existing.length > 0) {
        return res.status(409).json({
          success: false,
          error: 'An account with this email already exists. Please log in instead.'
        })
      }

      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=0ea5e9&color=fff&bold=true`

      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role, avatar, provider) VALUES (?, ?, ?, ?, ?, ?)',
        [cleanName, cleanEmail, password, 'user', avatar, 'local']
      )

      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        user: {
          id: result.insertId,
          name: cleanName,
          email: cleanEmail,
          role: 'user',
          avatar,
          provider: 'local'
        },
        token: `token_${result.insertId}_${Date.now()}`
      })
    } else {
      // Memory fallback
      const existing = memoryUsers.find((u) => u.email.toLowerCase() === cleanEmail)
      if (existing) {
        return res.status(409).json({
          success: false,
          error: 'An account with this email already exists. Please log in.'
        })
      }

      const newUser = {
        id: memoryUsers.length + 1,
        name: cleanName,
        email: cleanEmail,
        password,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=0ea5e9&color=fff&bold=true`,
        provider: 'local',
        created_at: new Date().toISOString()
      }

      memoryUsers.push(newUser)

      return res.status(201).json({
        success: true,
        message: 'Account registered successfully!',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
          provider: 'local'
        },
        token: `mock_token_${newUser.id}`
      })
    }
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({
      success: false,
      error: 'An error occurred during account registration.'
    })
  }
}

export async function googleLogin(req, res) {
  try {
    const { email, name, avatar } = req.body

    const cleanEmail = (email || 'google.user@example.com').trim().toLowerCase()
    const cleanName = (name || 'Google User').trim()
    const userAvatar = avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=4285F4&color=fff&bold=true`

    if (isDbConnected) {
      const pool = getDbPool()
      const [rows] = await pool.query('SELECT * FROM users WHERE LOWER(email) = ?', [cleanEmail])

      if (rows.length > 0) {
        const user = rows[0]
        return res.status(200).json({
          success: true,
          message: 'Signed in with Google successfully!',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'user',
            avatar: user.avatar || userAvatar,
            provider: 'google'
          },
          token: `google_token_${user.id}_${Date.now()}`
        })
      }

      // Create new Google user
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role, avatar, provider) VALUES (?, ?, ?, ?, ?, ?)',
        [cleanName, cleanEmail, '', 'user', userAvatar, 'google']
      )

      return res.status(200).json({
        success: true,
        message: 'Signed in with Google successfully!',
        user: {
          id: result.insertId,
          name: cleanName,
          email: cleanEmail,
          role: 'user',
          avatar: userAvatar,
          provider: 'google'
        },
        token: `google_token_${result.insertId}_${Date.now()}`
      })
    } else {
      let user = memoryUsers.find((u) => u.email.toLowerCase() === cleanEmail)
      if (!user) {
        user = {
          id: memoryUsers.length + 1,
          name: cleanName,
          email: cleanEmail,
          password: '',
          role: 'user',
          avatar: userAvatar,
          provider: 'google',
          created_at: new Date().toISOString()
        }
        memoryUsers.push(user)
      }

      return res.status(200).json({
        success: true,
        message: 'Signed in with Google successfully!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          provider: 'google'
        },
        token: `google_token_${user.id}`
      })
    }
  } catch (error) {
    console.error('Google login error:', error)
    return res.status(500).json({
      success: false,
      error: 'Google authentication error.'
    })
  }
}
