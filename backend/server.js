const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
// const uri = env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log('Mongo db connection is established'))
	.catch(err => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
})

const classesRouter = require('./routes/classes');

app.use('/api/classes', classesRouter);

app.listen(port, () => {
	// console.log(process.env.ATLAS_URI);
	console.log(`Server is running on port: ${port}`);
});


