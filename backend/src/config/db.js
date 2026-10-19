import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'portfolio_db',
  DB_PORT = 3306,
} = process.env

let pool = null
export let isDbConnected = false

export async function initDatabase() {
  try {
    // 1. First connect without specifying database to create database if it doesn't exist
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: Number(DB_PORT),
    })

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`)
    await connection.end()

    // 2. Create the connection pool targeting the database
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: Number(DB_PORT),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })

    // 3. Test pool connection
    const testConn = await pool.getConnection()
    testConn.release()
    isDbConnected = true

    console.log(`✅ [MySQL]: Connected successfully to database "${DB_NAME}" on port ${DB_PORT}`)

    // 4. Create Tables if they don't exist
    await createTables()

    // 5. Seed initial projects if empty
    await seedInitialData()

    return pool
  } catch (error) {
    isDbConnected = false
    console.warn(`⚠️ [MySQL Warning]: Could not connect to MySQL database at ${DB_HOST}:${DB_PORT}.`)
    console.warn(`👉 Reason: ${error.message}`)
    console.warn(`💡 The server will start in offline/mock fallback mode so you can continue working smoothly.`)
    return null
  }
}

async function createTables() {
  if (!pool) return

  // Contacts / Leads table
  const createContactsTable = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      project_type VARCHAR(100) DEFAULT 'Full-Stack Web App',
      budget VARCHAR(50) DEFAULT 'Not Specified',
      message TEXT NOT NULL,
      status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  // Projects table
  const createProjectsTable = `
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      category VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      tags JSON,
      live_demo VARCHAR(255),
      github VARCHAR(255),
      featured BOOLEAN DEFAULT FALSE,
      image VARCHAR(255),
      metrics VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  // Users table for Authentication
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255),
      provider VARCHAR(50) DEFAULT 'local',
      avatar VARCHAR(255),
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  await pool.query(createContactsTable)
  await pool.query(createProjectsTable)
  await pool.query(createSubscribersTable)
  await pool.query(createUsersTable)

  // Seed default admin if no users
  try {
    const [userRows] = await pool.query('SELECT COUNT(*) as count FROM users')
    if (userRows[0].count === 0) {
      await pool.query(
        'INSERT INTO users (name, email, password, provider, avatar, role) VALUES (?, ?, ?, ?, ?, ?)',
        [
          'Hassan Akbar',
          'akbarhassan918@gmail.com',
          'password123',
          'local',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          'admin'
        ]
      )
    }
  } catch (e) {}

  console.log('✅ [MySQL]: Tables "contacts", "projects", "subscribers", and "users" verified/created.')
}

async function seedInitialData() {
  if (!pool) return

  try {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM projects')
    if (rows[0].count === 0) {
      console.log('📦 [MySQL]: Seeding initial portfolio projects...')
      
      const seedProjects = [
        [
          'Logistics Management System',
          'Full-Stack',
          'An enterprise-grade full-stack logistics management platform that streamlines shipment tracking, parcel assignment, driver fleet logs, and warehouse status reports.',
          JSON.stringify(['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'REST API', 'Vercel']),
          'https://logistics-management-system-lxqp.vercel.app/',
          'https://github.com/hassanakbar-dev/logistics-management-system',
          true,
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
          '100% Responsive • Sub-100ms Queries'
        ],
        [
          'TechSphere Solutions Platform',
          'Full-Stack',
          'A corporate digital agency web platform showcasing tech services, client case studies, contact leads intake, and modern dynamic portfolio displays.',
          JSON.stringify(['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'Full-Stack']),
          'https://techsphere-solutions.vercel.app/',
          'https://github.com/hassanakbar-dev/techsphere-solutions',
          true,
          '/techsphere.png',
          '98 Lighthouse Score • Production Deployed'
        ],
        [
          'Healthcare Management System',
          'Full-Stack',
          'A centralized clinic and healthcare management application built to manage patient records, appointment bookings, doctor availability, and medical histories.',
          JSON.stringify(['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'CRUD System']),
          'https://healthcare-system-eta-liart.vercel.app/',
          'https://github.com/hassanakbar-dev/healthcare-system',
          true,
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
          'Zero Booking Collisions • Full CRUD'
        ],
        [
          'TaskFlow - Kanban & Agile Sprint Manager',
          'Web Apps',
          'An interactive productivity application featuring drag-and-drop style Kanban boards, priority badges, sprint task categorization, and persistent storage.',
          JSON.stringify(['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Productivity', 'Web App']),
          'https://taskflow-kanban-board.vercel.app/',
          'https://github.com/hassanakbar-dev/taskflow-manager',
          true,
          'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
          'Real-time State • Persistent Storage'
        ],
        [
          'Movie Search & CineVault Discovery App',
          'Frontend',
          'A high-speed entertainment search engine that pulls data from movie databases, displaying HD movie posters, synopses, cast info, and ratings.',
          JSON.stringify(['React.js', 'REST API', 'Tailwind CSS', 'Async/Await', 'Vite']),
          'https://movie-search-app-eta.vercel.app',
          'https://github.com/hassanakbar-dev/movie-search-app',
          true,
          'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
          'Instant Live Search • Asynchronous API'
        ]
      ]

      const insertSql = `
        INSERT INTO projects (title, category, description, tags, live_demo, github, featured, image, metrics)
        VALUES ?
      `
      await pool.query(insertSql, [seedProjects])
      console.log('✅ [MySQL]: 5 core projects seeded into database.')
    }
  } catch (err) {
    console.error('⚠️ [MySQL Seed Error]:', err.message)
  }
}

export function getPool() {
  return pool
}

export const getDbPool = getPool

