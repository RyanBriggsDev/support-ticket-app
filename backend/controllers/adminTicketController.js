const { Ticket } = require('../models/ticketModel');
const mongoose = require('mongoose');

// GET all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
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
    const ticket = await Ticket.findOneAndUpdate(
      id,
      {
        title,
        description,
        active,
      },
      { new: true }
    );
    await res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const doc = await Character.findOneAndUpdate(filter, update, {
//   new: true,
// });

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
  getAllTickets,
  getSingleTicket,
  updateTicket,
  addMessage,
};
