const Ticket = require('../models/ticketModel');
const { validateCreateTicket } = require('../utils/validation');

// create ticket
const createTicket = async (req, res) => {
  const { title, userId, description } = req.body;
  try {
    validateCreateTicket(title, userId, description);
    try {
      const ticket = await Ticket.create({ title, userId, description });
      await res.status(200).json({
        title: ticket.title,
        userId: ticket.userId,
        description: ticket.description,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTickets = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      throw Error('Account error. Please refresh and try again.');
    }
    const tickets = await Ticket.find({ userId });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTicket, getAllTickets };
