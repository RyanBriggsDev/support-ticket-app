const express = require('express');
const router = express.Router();
const {
  createTicket,
  getAllTickets,
} = require('../controllers/ticketController');

router.get('/', getAllTickets);
router.post('/create', createTicket);

module.exports = router;
