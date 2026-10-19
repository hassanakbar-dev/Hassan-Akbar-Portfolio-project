import { Router } from 'express'
import { getPool, isDbConnected } from '../config/db.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const pool = getPool()
    let totalMessages = 0
    let unreadMessages = 0
    let totalProjects = 5

    if (pool && isDbConnected) {
      const [msgRows] = await pool.query('SELECT COUNT(*) as total, SUM(CASE WHEN status="unread" THEN 1 ELSE 0 END) as unread FROM contacts')
      const [projRows] = await pool.query('SELECT COUNT(*) as count FROM projects')
      totalMessages = msgRows[0]?.total || 0
      unreadMessages = msgRows[0]?.unread || 0
      totalProjects = projRows[0]?.count || 0
    }

    res.status(200).json({
      success: true,
      data: {
        serverStatus: 'online',
        databaseConnected: isDbConnected,
        metrics: {
          experience: '5+ Months',
          completedProjects: totalProjects,
          clientSatisfaction: '100%',
          responseTime: '< 12 Hours',
          totalInquiries: totalMessages,
          unreadInquiries: unreadMessages
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
