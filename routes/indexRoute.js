const express = require('express');
const mongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017/url-shortener';	
const url = process.env.PROD_MONGODB;

const indexRoute = express.Router();


indexRoute.get('/favicon.ico', function(req, res) {
    res.status(204);
});

indexRoute.get('/:key', function(req, res) {
	const key = req.params.key;
	mongoClient.connect(url, (err, db) => {
		if (err) {
			console.log('index route error', process.env,err);
			throw err;
		}
		const urls = db.collection('urls');
		urls.find({shortId: key}).toArray((err, docs) => { 
			if (err) throw err;
			db.close();
			console.log('docs',docs);
			res.redirect(docs[0].url);
		});
	});
});
module.exports = indexRoute;