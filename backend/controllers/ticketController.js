const { findById } = require('../models/ticketModel');
const Ticket = require('../models/ticketModel');
const mongoose = require('mongoose');

// CREATE ticket
const createTicket = async (req, res) => {
  const { title, userId, description } = req.body;
  // validation
  try {
    if (!title) {
      throw Error('Ticket title required.');
    }
    if (!userId) {
      throw Error('Account error. Please refresh and try again.');
    }
    if (!description) {
      throw Error(
        'Please fill in the description box to give us more information about your issue.'
      );
    }
    const ticket = await Ticket.create({
      title,
      userId,
      description,
      active: true,
    });
    await res.status(200).json({
      title: ticket.title,
      userId: ticket.userId,
      description: ticket.description,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all tickets
const getAllTickets = async (req, res) => {
  const user_id = req.user._id;

  try {
    const tickets = await Ticket.find({ userId: user_id });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET single ticket
const getSingleTicket = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Cannot find ticket.' });
  }
  const ticket = await Ticket.findById(id);
  if (!ticket) return res.status(404).json({ error: 'Cannot find ticket.' });
  res.status(200).json(ticket);
};

module.exports = { createTicket, getAllTickets, getSingleTicket };
