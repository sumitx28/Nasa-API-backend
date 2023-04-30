require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

db.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB. Error : ' + err));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log('App listening on PORT : ' + PORT);
});
