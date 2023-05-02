const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
  createTicket,
  getAllTickets,
} = require('../controllers/ticketController');

const router = express.Router();

// require auth for all tickets
router.use(requireAuth);

router.get('/', getAllTickets);
router.post('/create', createTicket);

module.exports = router;
