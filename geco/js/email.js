const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendConfirmationEmail(userEmail, token) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Confirmez votre adresse email',
        html: `<p>Merci de confirmer votre adresse email en cliquant sur le lien suivant:</p>
               <a href="https://yourwebsite.com/confirm?token=${token}">Confirmer</a>`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé: ' + info.response);
    } catch (error) {
        console.log('Erreur d\'envoi de l\'email: ' + error.message);
    }
}

module.exports = sendConfirmationEmail;
