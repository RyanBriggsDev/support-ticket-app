require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const ticketRoutes = require('./routes/tickets');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT;

// convert body to json
app.use(express.json());

// log new requests
app.use((req, res, next) => {
  console.log(`Path: ${req.path}. Method: ${req.method}`);
  next();
});

// routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);

app.use('/', (req, res) => {
  res.json('Welcome to the app');
});

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT} and connected to db.`);
    });
  })
  .catch((err) => console.log(err));
