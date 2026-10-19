import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initDatabase, isDbConnected } from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import statsRoutes from './routes/statsRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// 1. CORS Configuration
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:5174']

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
        return callback(null, true)
      }
      return callback(null, true) // Permissive for local development
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

// 2. Body Parser Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 3. Request Logger
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString()
  console.log(`📡 [${timestamp}] ${req.method} ${req.url}`)
  next()
})

// 4. Base & Health Check Endpoints
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Hassan Akbar Portfolio Backend API is running smoothly.',
    version: '1.0.0',
    databaseConnected: isDbConnected,
    endpoints: {
      health: 'GET /api/health',
      auth: 'POST /api/auth/login, POST /api/auth/register, POST /api/auth/google',
      contacts: 'POST /api/contact, GET /api/contact',
      projects: 'GET /api/projects, POST /api/projects',
      stats: 'GET /api/stats'
    }
  })
})

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: isDbConnected ? 'connected (MySQL)' : 'fallback (mock mode)'
  })
})

// 5. Mount API Routes
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/stats', statsRoutes)

// 6. 404 & Error Handling
app.use(notFoundHandler)
app.use(errorHandler)

// 7. Start Server & Initialize Database
async function startServer() {
  // Initialize MySQL Connection & Schemas
  await initDatabase()

  app.listen(PORT, () => {
    console.log(`\n🚀 ========================================================`)
    console.log(`   Hassan Akbar Portfolio Backend Server Running!`)
    console.log(`   ➜ Local API:    http://localhost:${PORT}`)
    console.log(`   ➜ Health Check: http://localhost:${PORT}/api/health`)
    console.log(`   ➜ Environment:  ${process.env.NODE_ENV || 'development'}`)
    console.log(`   ➜ Database:     ${isDbConnected ? 'MySQL Connected' : 'Mock Mode (Ready for XAMPP)'}`)
    console.log(`========================================================\n`)
  })
}

startServer()
