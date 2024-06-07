const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid');
const bcrypt = require('bcrypt'); // Ajout de bcrypt

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'recyclage_textile'
});

// Connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connexion à la base de données réussie !');
});

// Configuration du transporteur SendGrid
const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    // api_key: '###########################'
  }
}));

// Fonction pour envoyer un email de confirmation
function sendConfirmationEmail(email) {
  const mailOptions = {
    from: 'christellezobieu@gmail.com', // Remplacez par votre adresse email
    to: email,
    subject: 'Confirmation d\'inscription',
    text: 'Merci pour votre inscription. Veuillez confirmer votre inscription en cliquant sur le lien suivant : ...',
    html: '<strong>Merci pour votre inscription. Veuillez confirmer votre inscription en cliquant sur le lien suivant : ...</strong>',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'email:', error);
    } else {
      console.log('Email envoyé:', info.response);
    }
  });
}

// Route pour l'enregistrement des utilisateurs
app.post('/register', (req, res) => {
  const { nom, prenom, email, password, age, commune, adresse } = req.body;
  console.log('Données reçues:', req.body);

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (nom, prenom, email, password, age, commune, adresse) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nom, prenom, email, hashedPassword, age, commune, adresse], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données:', err);
      return res.status(500).json({ error: err });
    }

    sendConfirmationEmail(email);

    res.status(200).json({ message: 'Utilisateur enregistré avec succès ! Un e-mail de confirmation a été envoyé.' });
  });
});

// Route pour la connexion des utilisateurs
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', err);
      return res.status(500).json({ error: 'Erreur lors de la vérification de l\'utilisateur' });
    }

    if (results.length > 0) {
      const user = results[0];

      if (bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ success: true, message: 'Connexion réussie!' });
      } else {
        res.status(401).json({ success: false, message: 'Mot de passe incorrect.' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Utilisateur non trouvé.' });
    }
  });
});

// Route pour ajouter un contact
app.post('/contacts', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Données reçues:', req.body);

  const sql = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données:', err);
      return res.status(500).json({ error: err });
    }

    res.status(200).json({ message: 'Contact ajouté avec succès!' });
  });
});

// Route pour ajouter une collecte
app.post('/collectes', (req, res) => {
  const { point_collecte, date_depot, heure_depot } = req.body;
  console.log('Données reçues:', req.body);

  const sql = 'INSERT INTO collectes (point_collecte, date_depot, heure_depot) VALUES (?, ?, ?)';
  db.query(sql, [point_collecte, date_depot, heure_depot], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données:', err);
      return res.status(500).json({ error: err });
    }

    res.status(200).json({ message: 'Collecte ajoutée avec succès!' });
  });
});

// Route pour ajouter une récupération de vêtements
app.post('/recuperation_vetements', (req, res) => {
  const { nom, prenom, email, contact, commune, autre_commune, plage_horaire } = req.body;
  console.log('Données reçues:', req.body);

  const sql = 'INSERT INTO recuperation_vetements (nom, prenom, email, contact, commune, autre_commune, plage_horaire) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nom, prenom, email, contact, commune, autre_commune, plage_horaire], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données:', err);
      return res.status(500).json({ error: err });
    }

    res.status(200).json({ message: 'Récupération de vêtements ajoutée avec succès!' });
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
