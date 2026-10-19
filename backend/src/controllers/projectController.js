import { getPool, isDbConnected } from '../config/db.js'

const fallbackProjects = [
  {
    id: 1,
    title: 'Logistics Management System',
    category: 'Full-Stack',
    description: 'An enterprise-grade full-stack logistics management platform that streamlines shipment tracking, parcel assignment, driver fleet logs, and warehouse status reports.',
    tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'REST API', 'Vercel'],
    live_demo: 'https://logistics-management-system-lxqp.vercel.app/',
    github: 'https://github.com/hassanakbar-dev/logistics-management-system',
    featured: true,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    metrics: '100% Responsive • Sub-100ms Queries'
  },
  {
    id: 2,
    title: 'TechSphere Solutions Platform',
    category: 'Full-Stack',
    description: 'A corporate digital agency web platform showcasing tech services, client case studies, contact leads intake, and modern dynamic portfolio displays.',
    tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'Full-Stack'],
    live_demo: 'https://techsphere-solutions.vercel.app/',
    github: 'https://github.com/hassanakbar-dev/techsphere-solutions',
    featured: true,
    image: '/techsphere.png',
    metrics: '98 Lighthouse Score • Production Deployed'
  },
  {
    id: 3,
    title: 'Healthcare Management System',
    category: 'Full-Stack',
    description: 'A centralized clinic and healthcare management application built to manage patient records, appointment bookings, doctor availability, and medical histories.',
    tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'CRUD System'],
    live_demo: 'https://healthcare-system-eta-liart.vercel.app/',
    github: 'https://github.com/hassanakbar-dev/healthcare-system',
    featured: true,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    metrics: 'Zero Booking Collisions • Full CRUD'
  },
  {
    id: 4,
    title: 'TaskFlow - Kanban & Agile Sprint Manager',
    category: 'Web Apps',
    description: 'An interactive productivity application featuring drag-and-drop style Kanban boards, priority badges, sprint task categorization, and persistent storage.',
    tags: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Productivity', 'Web App'],
    live_demo: 'https://taskflow-kanban-board.vercel.app/',
    github: 'https://github.com/hassanakbar-dev/taskflow-manager',
    featured: true,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    metrics: 'Real-time State • Persistent Storage'
  },
  {
    id: 5,
    title: 'Movie Search & CineVault Discovery App',
    category: 'Frontend',
    description: 'A high-speed entertainment search engine that pulls data from movie databases, displaying HD movie posters, synopses, cast info, and ratings.',
    tags: ['React.js', 'REST API', 'Tailwind CSS', 'Async/Await', 'Vite'],
    live_demo: 'https://movie-search-app-eta.vercel.app',
    github: 'https://github.com/hassanakbar-dev/movie-search-app',
    featured: true,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    metrics: 'Instant Live Search • Asynchronous API'
  }
]

export async function getAllProjects(req, res, next) {
  try {
    const { category, featured } = req.query
    const pool = getPool()

    if (pool && isDbConnected) {
      let query = 'SELECT * FROM projects WHERE 1=1'
      const params = []

      if (category && category !== 'All') {
        query += ' AND LOWER(category) = LOWER(?)'
        params.push(category)
      }

      if (featured === 'true') {
        query += ' AND featured = 1'
      }

      query += ' ORDER BY id ASC'

      const [rows] = await pool.query(query, params)
      const parsed = rows.map((r) => ({
        ...r,
        tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags
      }))

      return res.status(200).json({
        success: true,
        count: parsed.length,
        data: parsed
      })
    } else {
      let list = [...fallbackProjects]
      if (category && category !== 'All') {
        list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase())
      }
      if (featured === 'true') {
        list = list.filter((p) => p.featured)
      }
      return res.status(200).json({
        success: true,
        count: list.length,
        data: list,
        mode: 'fallback'
      })
    }
  } catch (error) {
    next(error)
  }
}

export async function getProjectById(req, res, next) {
  try {
    const { id } = req.params
    const pool = getPool()

    if (pool && isDbConnected) {
      const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id])
      if (rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Project not found' })
      }
      const item = rows[0]
      item.tags = typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags
      return res.status(200).json({ success: true, data: item })
    } else {
      const item = fallbackProjects.find((p) => p.id === Number(id))
      if (!item) {
        return res.status(404).json({ success: false, error: 'Project not found' })
      }
      return res.status(200).json({ success: true, data: item, mode: 'fallback' })
    }
  } catch (error) {
    next(error)
  }
}

export async function createProject(req, res, next) {
  try {
    const { title, category, description, tags, live_demo, github, featured = false, image, metrics } = req.body

    if (!title || !category || !description) {
      return res.status(400).json({ success: false, error: 'Title, category, and description are required' })
    }

    const pool = getPool()
    if (pool && isDbConnected) {
      const sql = `
        INSERT INTO projects (title, category, description, tags, live_demo, github, featured, image, metrics)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
      const [result] = await pool.query(sql, [
        title,
        category,
        description,
        JSON.stringify(tags || []),
        live_demo || '#',
        github || '#',
        featured ? 1 : 0,
        image || '/default.png',
        metrics || ''
      ])

      return res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: { id: result.insertId, title, category }
      })
    } else {
      const newId = fallbackProjects.length + 1
      const item = { id: newId, title, category, description, tags, live_demo, github, featured, image, metrics }
      fallbackProjects.push(item)
      return res.status(201).json({ success: true, message: 'Project created in fallback mode', data: item })
    }
  } catch (error) {
    next(error)
  }
}

export async function deleteProject(req, res, next) {
  try {
    const { id } = req.params
    const pool = getPool()

    if (pool && isDbConnected) {
      await pool.query('DELETE FROM projects WHERE id = ?', [id])
      return res.status(200).json({ success: true, message: 'Project deleted successfully' })
    } else {
      const idx = fallbackProjects.findIndex((p) => p.id === Number(id))
      if (idx !== -1) fallbackProjects.splice(idx, 1)
      return res.status(200).json({ success: true, message: 'Project deleted successfully' })
    }
  } catch (error) {
    next(error)
  }
}

export async function toggleFeaturedProject(req, res, next) {
  try {
    const { id } = req.params
    const pool = getPool()

    if (pool && isDbConnected) {
      await pool.query('UPDATE projects SET featured = NOT featured WHERE id = ?', [id])
      return res.status(200).json({ success: true, message: 'Featured status updated' })
    } else {
      const p = fallbackProjects.find((p) => p.id === Number(id))
      if (p) p.featured = !p.featured
      return res.status(200).json({ success: true, message: 'Featured status updated' })
    }
  } catch (error) {
    next(error)
  }
}
