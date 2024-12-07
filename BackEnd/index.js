const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
