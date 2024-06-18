const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Expense = require('./Expense'); // Adjust the path as per your directory structure

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expenses', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//Schemas
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true }
});

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  userEmail: { type: String, required: true } // Store user's email directly
});

const User = mongoose.model('User', UserSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

// Registration endpoint
app.post('/register', async (req, res) => {
  const { email, username } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = new User({
      email: email,
      username: username
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, username } = req.body;

  try {
    const user = await User.findOne({ email: email, username: username });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or username" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: "Server error" });
  }
});

// Transaction endpoint
app.post('/api/transaction', async (req, res) => {
  const { type, description, amount, email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newTransaction = new Transaction({
      type: type,
      description: description,
      amount: amount,
      userEmail: email // Store user's email directly
    });

    await newTransaction.save();

    res.status(201).json({ message: "Transaction added successfully" });
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ error: "Server error" });
  }
});

// CRUD
app.post('/transactions', async (req, res) => {
  const { description, amount, category, type } = req.body;

  try {
    if (!description || !amount || !category || !type) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTransaction = new Expense({ description, amount, category, type });
    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Expense.find();
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update
app.put('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { description, amount, category, type } = req.body;

  try {
    const updatedTransaction = await Expense.findByIdAndUpdate(id, { description, amount, category, type }, { new: true });
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
app.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Expense.findByIdAndDelete(id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Calculate
app.get('/calculate', async (req, res) => {
  try {
    const totalIncome = await Expense.aggregate([
      { $match: { type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalExpenses = await Expense.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const result = {
      totalIncome: totalIncome.length > 0 ? totalIncome[0].total : 0,
      totalExpenses: totalExpenses.length > 0 ? totalExpenses[0].total : 0,
      balance: (totalIncome.length > 0 ? totalIncome[0].total : 0) - (totalExpenses.length > 0 ? totalExpenses[0].total : 0)
    };

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
