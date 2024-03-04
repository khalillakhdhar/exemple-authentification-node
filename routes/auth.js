const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Enregistrer
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'enregistrement de l'utilisateur" });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }
    const token = jwt.sign({ id: user._id }, 'Kb98Noe+9Z1hcu@N)Cr%', { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erreur de connexion' });
  }
});

module.exports = router;
