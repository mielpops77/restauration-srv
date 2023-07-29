const mongoose = require('mongoose');

const reservationConfigSchema = new mongoose.Schema({
  numberPlacesHour: {
    type: Number,
    required: true
  },

  scheduleOptions: {
    type: Array,
    required: true
  }
  // Autres champs de la réservation
});

const ReservationConfigModel = mongoose.model('ReservationConfig', reservationConfigSchema);

module.exports = ReservationConfigModel;
