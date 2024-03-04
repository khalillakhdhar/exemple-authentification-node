const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connecter à MongoDB
mongoose.connect('mongodb://localhost:27017/exemple-auth-node', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Échec de connexion à MongoDB', err));
//create testing user





// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur en cours d'exécution sur le port ${port}`));
