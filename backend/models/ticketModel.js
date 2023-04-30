const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String, required: true },
});

// Static Create Ticket Method
ticketSchema.statics.createTicket = async function ({
  title,
  userId,
  description,
}) {
  // validation
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
  const ticket = await this.create({ title, userId, description });
  return ticket;
};

module.exports = mongoose.model('Ticket', ticketSchema);
