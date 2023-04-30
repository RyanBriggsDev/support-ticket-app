const Ticket = require('../models/ticketModel');

// create ticket
const createTicket = async (req, res) => {
  const { title, userId, description } = req.body;
  try {
    const ticket = await Ticket.createTicket({ title, userId, description });
    await res.status(200).json({
      title: ticket.title,
      userId: ticket.userId,
      description: ticket.description,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTicket };
