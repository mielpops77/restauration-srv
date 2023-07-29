const mongoose = require('mongoose');

// Schéma de réservation
const reservationSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true
	},
	nombrePersonnes: {
		type: Number,
		required: true
	},
	hour:
	{
		type: String,
		required: true
	},
	firstName:
	{
		type: String,
		required: true
	},

	lastName:
	{
		type: String,
		required: true
	},

	mobile:
	{
		type: String,
		required: true
	},

	email:
	{
		type: String,
		required: true
	},

	message:
	{
		type: String,
		required: false
	}
	// Autres champs de la réservation
});

// Modèle de réservation
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
