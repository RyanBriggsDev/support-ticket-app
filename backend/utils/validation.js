const validateCreateTicket = (title, userId, description) => {
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
  return;
};

module.exports = { validateCreateTicket };
