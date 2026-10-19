import { Router } from 'express'
import {
  submitContact,
  getAllContacts,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js'

const router = Router()

// POST /api/contact -> Submit new message from contact form
router.post('/', submitContact)

// GET /api/contact -> View all submitted messages
router.get('/', getAllContacts)

// PATCH /api/contact/:id/status -> Update read/replied status
router.patch('/:id/status', updateContactStatus)

// DELETE /api/contact/:id -> Remove message
router.delete('/:id', deleteContact)

export default router
