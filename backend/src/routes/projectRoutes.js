import { Router } from 'express'
import {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  toggleFeaturedProject
} from '../controllers/projectController.js'

const router = Router()

// GET /api/projects -> Get all projects (supports ?category=... & ?featured=true)
router.get('/', getAllProjects)

// GET /api/projects/:id -> Get single project by id
router.get('/:id', getProjectById)

// POST /api/projects -> Create new project
router.post('/', createProject)

// PATCH /api/projects/:id/featured -> Toggle featured flag
router.patch('/:id/featured', toggleFeaturedProject)

// DELETE /api/projects/:id -> Remove project
router.delete('/:id', deleteProject)

export default router
