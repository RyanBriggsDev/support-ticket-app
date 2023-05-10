const { Ticket, Message } = require('../models/ticketModel');
const { findById } = require('../models/ticketModel');
const mongoose = require('mongoose');

// CREATE ticket
const createTicket = async (req, res) => {
  const { title, userId, description, userName } = req.body;
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
      messages: { message: description, user: userId, userName },
    });
    await res.status(200).json({
      title: ticket.title,
      userId: ticket.userId,
      description: ticket.description,
      messages: ticket.messages,
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

// UPDATE single ticket
const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { title, description, active } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Cannot find ticket.' });
    }
    const ticket = await Ticket.findOneAndUpdate(id, {
      title,
      description,
      active,
    });
    await res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add new message
const addMessage = async (req, res) => {
  const { message, user, userName } = req.body;
  const { id } = req.params;
  // find ticket
  try {
    if (!message) {
      throw Error('Please add a message.');
    }
    if (!user || !userName) {
      throw Error('Account error. Please refresh and try again.');
    }
    const ticket = await Ticket.findById(id);
    if (!ticket) throw Error('No ticket found.');
    if (ticket) {
      ticket.messages.push({ message, user, userName });
      await ticket.save();
      res.status(200).json(ticket);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getSingleTicket,
  updateTicket,
  addMessage,
};
