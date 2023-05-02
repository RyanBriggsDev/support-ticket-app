const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
  createTicket,
  getAllTickets,
  getSingleTicket,
} = require('../controllers/ticketController');

const router = express.Router();

// require auth for all tickets
router.use(requireAuth);

router.get('/', getAllTickets);
router.get('/:id', getSingleTicket);
router.post('/create', createTicket);

module.exports = router;
