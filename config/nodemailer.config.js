/* eslint-disable linebreak-style */
require('dotenv').config();
const nodemailer = require('nodemailer');
const config = require('../config/auth.config');

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user,
        pass: pass,
    },
});

module.exports.sendConfirmationEmail = (email, firstName, lastName, date, nombrePersonnes, hour) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: 'Please confirm your account',
        html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background-color: #f9f9f9; text-align: center; padding: 20px;">
            <h1 style="font-size: 24px;">Le spécialiste du couscous au lait</h1>
          </div>
          <hr style="border: 1px solid #ccc; margin: 0;">
          <div style="text-align: center; padding: 20px;">
            <h2 style="font-size: 20px;">Votre réservation au Le spécialiste du couscous au lait est confirmée</h2>
            <p>Détail de la réservation</p>
          </div>
          <hr style="border: 1px solid #ccc; margin: 0;">
          <div style="text-align: center; padding: 20px;">
            <p>Réservation de ${lastName} ${firstName}, le ${date} à ${hour}.</p>
            <p>Nombre de couverts réservés : ${nombrePersonnes}</p>
          </div>
          <div style="text-align: center;">
            <a href="#" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; margin: 10px; display: inline-block;">Envoyer un message</a>
            <a href="#" style="background-color: #dc3545; color: #fff; padding: 10px 20px; text-decoration: none; margin: 10px; display: inline-block;">Annuler votre réservation</a>
          </div>
     
          <hr style="border: 1px solid #ccc; margin: 0;">
          <div style="text-align: center;">
          <p>Coordonnées du restaurant</p>
        </div>
          <div style="text-align: center; padding: 20px;">
            <p>Nom du restaurant: MANGIA VELIZY</p>
            <p>Adresse: 15 place Louvois , 78140 Vélizy-Villacoublay</p>
            <p>Téléphone: 01 39 46 47 91</p>
          </div>
        </div>
      `,
    }).catch(err => console.log(err));
};
