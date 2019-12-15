const express = require('express');

const app = express();

app.get('/api/classes', (req, res) => {
	console.log("get request");
	const classes = [
		{
			name: 'CPSC 316',
			prof: 'Prof. Yoon',
			term: "Fall 2019",
		},
		{
			name: 'CPSC 111',
			prof: 'Prof. Miyazak',
			term: "Fall 2019",
		}
	];
	res.json(classes);
});

const port = 5000;

app.listen(port,  () => console.log(`Sever started on port ${port}`));


