const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Obtenir le profil
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: 'Non autorisé' });

  jwt.verify(token, 'Kb98Noe+9Z1hcu@N)Cr%', (err, user) => {
    if (err) return res.status(403).json({ error: 'Interdit' });
    req.user = user;
    next();
  });
}

module.exports = router;
