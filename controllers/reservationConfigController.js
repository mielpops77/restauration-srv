const ReservationConfigModel = require('../models/reservationConfigModel');

exports.createReservationConfig = async (req, res) => {
    try {
        const { numberPlacesHour } = req.body;
        const scheduleOptions = [
            {
                label: 'Déjeuner',
                times: [
                    { time: '12:00', isPast: false, reservationNbr: 0 },
                    { time: '12:15', isPast: false, reservationNbr: 0 },
                    { time: '12:30', isPast: false, reservationNbr: 0 },
                    { time: '12:45', isPast: false, reservationNbr: 0 },
                    { time: '13:00', isPast: false, reservationNbr: 0 },
                    { time: '13:15', isPast: false, reservationNbr: 0 },
                    { time: '13:30', isPast: false, reservationNbr: 0 },
                    { time: '13:45', isPast: false, reservationNbr: 0 },
                    // Autres horaires pour le déjeuner
                ],
            },
            {
                label: 'Après-midi',
                times: [
                    { time: '17:30', isPast: false, reservationNbr: 0 },
                    { time: '17:45', isPast: false, reservationNbr: 0 },
                    { time: '18:00', isPast: false, reservationNbr: 0 },
                    { time: '18:15', isPast: false, reservationNbr: 0 },
                    { time: '18:30', isPast: false, reservationNbr: 0 },
                    // Autres horaires pour l'après-midi
                ],
            },
            {
                label: 'Dîner',
                times: [
                    { time: '19:00', isPast: false, reservationNbr: 0 },
                    { time: '19:15', isPast: false, reservationNbr: 0 },
                    { time: '19:30', isPast: false, reservationNbr: 0 },
                    { time: '19:45', isPast: false, reservationNbr: 0 },
                    { time: '20:00', isPast: false, reservationNbr: 0 },
                    { time: '20:15', isPast: false, reservationNbr: 0 },
                    { time: '20:30', isPast: false, reservationNbr: 0 },
                    { time: '20:45', isPast: false, reservationNbr: 0 },
                    { time: '21:00', isPast: false, reservationNbr: 0 },
                    { time: '21:15', isPast: false, reservationNbr: 0 },
                    { time: '21:30', isPast: false, reservationNbr: 0 },
                    { time: '21:45', isPast: false, reservationNbr: 0 },
                    // Autres horaires pour le dîner
                ],
            },
        ];

        const reservationConfig = new ReservationConfigModel({
            numberPlacesHour,
            scheduleOptions
            // Autres champs de la configuration de réservation
        });

        await reservationConfig.save();
        res.status(201).json({ message: 'Configuration de réservation créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de la configuration de réservation' });
    }
};


exports.updateReservationConfig = async (req, res) => {
    try {
        const { id, numberPlacesHour } = req.body;

        // Chercher le document par son ID et mettre à jour le champ numberPlacesHour
        const updatedReservationConfig = await ReservationConfigModel.findByIdAndUpdate(
            id,
            { numberPlacesHour },
            { new: true } // Pour renvoyer le document mis à jour plutôt que l'ancien
        );

        if (!updatedReservationConfig) {
            return res.status(404).json({ error: 'Configuration de réservation non trouvée' });
        }

        res.status(200).json(updatedReservationConfig);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la configuration de réservation' });
    }
};



exports.getReservationConfig = async (req, res) => {
    try {
        // Chercher la configuration de réservation dans la base de données
        const reservationConfig = await ReservationConfigModel.findOne();

        if (!reservationConfig) {
            return res.status(404).json({ error: 'Configuration de réservation non trouvée' });
        }

        res.status(200).json({ numberPlacesHour: reservationConfig.numberPlacesHour });
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la configuration de réservation' });
    }
};


exports.getScheduleOptions = async (req, res) => {
    try {
        // Chercher la configuration de réservation dans la base de données
        const reservationConfig = await ReservationConfigModel.findOne();

        if (!reservationConfig) {
            return res.status(404).json({ error: 'Configuration de réservation non trouvée' });
        }

        res.status(200).json({ scheduleOptions: reservationConfig.scheduleOptions });
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la configuration de réservation' });
    }
};