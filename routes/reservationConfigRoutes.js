const express = require('express');
const router = express.Router();
const reservationConfigController = require('../controllers/reservationConfigController');



router.post('/', reservationConfigController.createReservationConfig);
router.put('/update', reservationConfigController.updateReservationConfig);
router.get('/', reservationConfigController.getReservationConfig);

router.get('/scheduleoptions', reservationConfigController.getScheduleOptions);

module.exports = router;