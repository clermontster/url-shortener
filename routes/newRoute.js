const express = require('express');
const indexRoute = express.Router();
const newRoute = express.Router();
const mongoClient = require('mongodb').MongoClient;
const shortid = require('shortid');
const validUrl = require('valid-url');
const url = process.env.PROD_MONGODB || 'mongodb://localhost:27017/url-shortener';

newRoute.get('/:url(*)', function(req, res) {
	const urlToShorten = req.params.url;
	const shortId = shortid.generate();
	if (validUrl.isUri(urlToShorten)) {
		mongoClient.connect(url, (err, db) => {
			if (err) {	
				console.log('index route error', err);
				throw err;
			}
			const urls = db.collection('urls');
			urls.insertOne({ url: urlToShorten, shortId: shortId }, (err, r) => {
				if (err) throw err;
				db.close();	
				const result = {
					original: urlToShorten,
					shortenedUrl: `${req.hostname}/${shortId}`,
				};
				res.send(result);
			});
		});
	} else {
		res.send('Please enter a valid');
	}
});

module.exports = newRoute;