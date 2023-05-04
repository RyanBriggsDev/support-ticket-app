const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: { type: String, required: true },
  user: { type: String, required: true },
});

const ticketSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);
const Message = mongoose.model('Message', messageSchema);

module.exports = { Ticket, Message };
