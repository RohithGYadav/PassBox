const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Password Schema
const PasswordSchema = new mongoose.Schema({
  id: { type: String, required: true },
  site: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const Password = mongoose.model('Password', PasswordSchema);

// Routes
app.get('/', async (req, res) => {
  try {
    const passwords = await Password.find({});
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch passwords" });
  }
});

app.post('/', async (req, res) => {
  const { id, site, username, password } = req.body;

  try {
    const newPassword = new Password({ id, site, username, password });
    await newPassword.save();
    res.status(201).json({ message: "Password saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save password" });
  }
});

app.delete('/', async (req, res) => {
  const { id } = req.body;

  try {
    await Password.findOneAndDelete({ id });
    res.json({ message: "Password deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete password" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
