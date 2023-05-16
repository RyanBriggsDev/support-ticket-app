const Admin = require('../models/adminModel');
const { Ticket } = require('../models/ticketModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);
    const token = createToken(admin._id);
    const tickets = await Ticket.find();
    if (!tickets) {
      throw Error('No tickets available.');
    }
    await res.status(200).json({
      name: admin.name,
      email: admin.email,
      adminId: admin._id,
      token,
      tickets,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const admin = await Admin.signup(name, email, password);
    const token = createToken(admin._id);
    const tickets = await Ticket.find();
    if (!tickets) {
      throw Error('No tickets available.');
    }
    res.status(200).json({ name, email, adminid: admin._id, token, tickets });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginAdmin, signupAdmin };
