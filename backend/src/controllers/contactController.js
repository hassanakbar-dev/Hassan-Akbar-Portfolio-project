import { getPool, isDbConnected } from '../config/db.js'

// In-memory fallback if MySQL is offline
const inMemoryContacts = []

export async function submitContact(req, res, next) {
  try {
    const { name, email, projectType = 'Full-Stack Web App', budget = 'Not Specified', message } = req.body

    // 1. Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required' })
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email is required' })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' })
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message content is required' })
    }

    const cleanData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      project_type: projectType.trim(),
      budget: budget.trim(),
      message: message.trim(),
      status: 'unread',
      created_at: new Date()
    }

    const pool = getPool()

    // 2. MySQL Persistence
    if (pool && isDbConnected) {
      const sql = `
        INSERT INTO contacts (name, email, project_type, budget, message, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `
      const [result] = await pool.query(sql, [
        cleanData.name,
        cleanData.email,
        cleanData.project_type,
        cleanData.budget,
        cleanData.message,
        cleanData.status
      ])

      console.log(`📩 [Contact Form]: New message from "${cleanData.name}" <${cleanData.email}> stored in MySQL (ID: ${result.insertId})`)

      return res.status(201).json({
        success: true,
        message: 'Message sent successfully! Hassan Akbar will get back to you within 12 hours.',
        data: {
          id: result.insertId,
          ...cleanData
        }
      })
    } else {
      // Offline fallback mode
      const simulatedId = inMemoryContacts.length + 1
      const savedContact = { id: simulatedId, ...cleanData }
      inMemoryContacts.push(savedContact)

      console.log(`📩 [Contact Form (Fallback)]: Message from "${cleanData.name}" saved in-memory (ID: ${simulatedId})`)

      return res.status(201).json({
        success: true,
        message: 'Message sent successfully! Hassan Akbar will get back to you within 12 hours.',
        data: savedContact,
        mode: 'fallback'
      })
    }
  } catch (error) {
    next(error)
  }
}

export async function getAllContacts(req, res, next) {
  try {
    const pool = getPool()

    if (pool && isDbConnected) {
      const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC')
      return res.status(200).json({
        success: true,
        count: rows.length,
        data: rows
      })
    } else {
      return res.status(200).json({
        success: true,
        count: inMemoryContacts.length,
        data: inMemoryContacts,
        mode: 'fallback'
      })
    }
  } catch (error) {
    next(error)
  }
}

export async function updateContactStatus(req, res, next) {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' })
    }

    const pool = getPool()
    if (pool && isDbConnected) {
      await pool.query('UPDATE contacts SET status = ? WHERE id = ?', [status, id])
      return res.status(200).json({ success: true, message: `Status updated to ${status}` })
    } else {
      const found = inMemoryContacts.find((c) => c.id === Number(id))
      if (found) found.status = status
      return res.status(200).json({ success: true, message: `Status updated to ${status}` })
    }
  } catch (error) {
    next(error)
  }
}

export async function deleteContact(req, res, next) {
  try {
    const { id } = req.params
    const pool = getPool()

    if (pool && isDbConnected) {
      await pool.query('DELETE FROM contacts WHERE id = ?', [id])
      return res.status(200).json({ success: true, message: 'Message deleted successfully' })
    } else {
      const idx = inMemoryContacts.findIndex((c) => c.id === Number(id))
      if (idx !== -1) inMemoryContacts.splice(idx, 1)
      return res.status(200).json({ success: true, message: 'Message deleted successfully' })
    }
  } catch (error) {
    next(error)
  }
}
