const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Static Signup Method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error('Both email and password fields are required.');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid.');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough.');
  }
  // check if user exists in the db already
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use.');
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

// Static Login Method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Both email and password fields are required.');
  }
  // check if user exists in the db already
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Invalid email or password.');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Invalid email or password');
  }
  return user;
};

module.exports = mongoose.model('User', userSchema);
