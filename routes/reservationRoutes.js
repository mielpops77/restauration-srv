const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
// const Reservation = require('../models/reservationModel');

// Route POST pour créer une nouvelle réservation
router.post('/', reservationController.createReservation);
router.get('/', reservationController.getReservationsFromDate);


router.get('/nonclickabledates', reservationController.getNonClickableDates);


module.exports = router;
