const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const reservationRoutes = require('./routes/reservationRoutes');
const reservationConfigRoutes = require('./routes/reservationConfigRoutes');


app.set('port', (process.env.port || 3000));

var corsOptions = {
	origin: 'https://couscousamdav.azurewebsites.net',
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Utiliser les routes de réservation
app.use('/reservations', reservationRoutes);
app.use('/reservationsconfig', reservationConfigRoutes);

mongoose.connect('mongodb+srv://mangavente:Z2e3zEvFkyI3WU4H@reservation.d9kebmx.mongodb.net/', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log('Connected to MongoDB Atlas');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB Atlas:', error);
	});

app.listen(app.get('port'), () => {
	console.log(`Server is running on port ${app.get('port')}`);
});