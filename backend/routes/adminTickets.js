const express = require('express');
const requireAdminAuth = require('../middleware/requireAdminAuth');
const {
  getAllTickets,
  getSingleTicket,
  updateTicket,
  addMessage,
} = require('../controllers/adminTicketController');

const router = express.Router();

// require auth for all tickets
router.use(requireAdminAuth);

router.get('/', getAllTickets);
router.get('/:id', getSingleTicket);
router.patch('/:id', updateTicket);
router.post('/message/:id', addMessage);

module.exports = router;
