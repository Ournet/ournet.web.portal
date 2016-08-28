'use strict';

var express = require('express');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();

//index

route.get(/\/(vremea|pogoda|meteo|prognoza)\/widget\/widgetframe/i, function(req, res) {
	var config = res.locals.config;
	utils.maxageRedirect(res);

	var url = req.originalUrl.substr(req.originalUrl.indexOf('/', 2));
	switch (config.country) {
		case 'md':
			url = 'http://meteo.click.md' + url;
			break;
		case 'ro':
			url = 'http://meteo.ournet.ro' + url;
			break;
		case 'ru':
			url = 'http://pogoda.zborg.ru' + url;
			break;
		default:
			url = '/';
			// res.send('');
			break;
	}

	res.redirect(301, url);
});
