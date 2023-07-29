
const Reservation = require('../models/reservationModel');
const nodemailer = require('../config/nodemailer.config');


exports.createReservation = async (req, res) => {
    try {
        // Récupérer les données de la réservation depuis le corps de la requête
        const { date, nombrePersonnes, hour, firstName, lastName, mobile, email, message } = req.body;
        // Créer une nouvelle instance du modèle Reservation
        const reservation = new Reservation({
            date,
            nombrePersonnes,
            hour,
            firstName,
            lastName,
            mobile,
            email,
            message
            // Autres champs de la réservation
        });

        console.log('sssss', email);

        // Enregistrer la réservation dans la base de données
        await reservation.save();
        res.status(201).json({ message: 'Réservation créée avec succès' });
        nodemailer.sendConfirmationEmail(
            email,
            firstName,
            lastName,
            date,
            nombrePersonnes,
            hour,
        );
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de la réservation' });
    }
};



exports.getReservationsFromDate = async (req, res) => {
    try {
        // Récupérer la date d'aujourd'hui
        const today = new Date();

        const todayDay = today.getDate();
        const todayMonth = today.getMonth() + 1;
        const todayYear = today.getFullYear();

        // Formater la date au format "yyyy-MM-dd"
        const formattedToday = `${todayDay.toString().padStart(2, '0')}-${todayMonth.toString().padStart(2, '0')}-${todayYear}`;

        // Récupérer les réservations avec date >= date d'aujourd'hui
        const reservations = await Reservation.find({ date: { $gte: formattedToday } });

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des réservations' });
    }
};



const formatDatesForMatCalendar = (dates) => {
    // Analyser les dates au format "dd-MM-yyyy" et les convertir en objet Date
    const parsedDates = dates.map((dateStr) => {
        const [day, month, year] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    });

    return parsedDates;
};

exports.getNonClickableDates = async (req, res) => {
    try {
        const { limiteInvitations, label } = req.query;
        const scheduleOptions = JSON.parse(req.query.scheduleOptions);


        let selectedSchedule;
        let selectedTimes;

        if (label !== 'all') {
            selectedSchedule = scheduleOptions.find((schedule) => schedule.label === label);
            selectedTimes = selectedSchedule.times.map((time) => time.time);
        }

        else {
            selectedTimes = scheduleOptions.reduce((timesArr, option) => {
                option.times.forEach((timeObj) => {
                    timesArr.push(timeObj.time);
                });
                return timesArr;
            }, []);
        }
        const pipeline = [
            {
                $group: {
                    _id: { date: "$date", hour: "$hour" },
                    totalPersons: { $sum: "$nombrePersonnes" },
                },
            },
            {
                $addFields: {
                    isFull: { $gt: ["$totalPersons", parseInt(limiteInvitations)] },
                },
            },
            {
                $match: {
                    isFull: true,
                },
            },
            {
                $group: {
                    _id: "$_id.date",
                    fullHours: { $push: "$_id.hour" },
                },
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    fullHours: 1,
                },
            },
        ];

        const nonClickableDates = await Reservation.aggregate(pipeline);

        const updatedNonClickableDates = nonClickableDates.map((item) => ({
            ...item,
            fullHours: addMissingTimes(item.fullHours),
        }));


        const verifiedDates = [];

        updatedNonClickableDates.forEach((doc) => {
            let isFull = true;
            isFull = selectedTimes.every((time) => doc.fullHours.includes(time));

            if (isFull) {
                verifiedDates.push(doc.date);
            }
        });

        const formattedDates = formatDatesForMatCalendar(verifiedDates);

        res.status(200).json(formattedDates);
    } catch (error) {
        console.error('Error in getNonClickableDates:', error);
        res.status(500).json({ error: 'An error occurred while fetching non-clickable dates' });
    }
};




function addMissingTimes(fullHours) {
    const result = [];

    for (const time of fullHours) {
        result.push(time);
        const timeParts = time.split(':');
        const hour = parseInt(timeParts[0], 10);
        const minute = parseInt(timeParts[1], 10);

        for (let i = 1; i <= 3; i++) {
            const nextMinute = minute + 15 * i;
            const nextHour = hour + Math.floor(nextMinute / 60);
            const formattedNextHour = nextHour.toString().padStart(2, '0');
            const formattedNextMinute = (nextMinute % 60).toString().padStart(2, '0');
            const nextTime = `${formattedNextHour}:${formattedNextMinute}`;

            if (!result.includes(nextTime)) {
                result.push(nextTime);
            }
        }
    }

    return result;
}
