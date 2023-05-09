const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
  createTicket,
  getAllTickets,
  getSingleTicket,
  updateTicket,
  addMessage,
} = require('../controllers/ticketController');

const router = express.Router();

// require auth for all tickets
router.use(requireAuth);

router.get('/', getAllTickets);
router.post('/create', createTicket);
router.get('/:id', getSingleTicket);
router.put('/:id', updateTicket);
router.post('/message/:id', addMessage);

module.exports = router;
