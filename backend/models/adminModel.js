const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Signup
adminSchema.statics.signup = async function (name, email, password) {
  // validation
  if (!email || !password || !name) {
    throw Error('Name, email and password fields are required.');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid.');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough.');
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Admin already exists. Please login instead.');
  }
  // hash pass
  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);
  const admin = await this.create({ name, email, password: hash });
  return admin;
};

// Login
adminSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Both email and password fields are required');
  }
  const admin = await this.findOne({ email });
  if (!admin) {
    throw Error('Invalid email or password');
  }
  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    throw Error('Invalid email or password');
  }
  return admin;
};

module.exports = mongoose.model('Admin', adminSchema);
