var express = require('express'),
	core = require('ournet.core'),
	_ = core._,
	Promise = core.Promise,
	util = require('util'),
	utils = require('../utils.js'),
	route = module.exports = express.Router();

//index

route.get(/\/(vremea|pogoda|meteo|prognoza)\/widget\/widgetframe/, function(req, res, next) {
	var config = res.locals.config;
	utils.maxageRedirect(res);

	var currentCulture = res.locals.currentCulture;

	var url = req.originalUrl.substr(req.originalUrl.indexOf('/', 2));
	switch (currentCulture.country) {
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
			res.send('');
			break;
	}

	res.redirect(301, url);

});

route.get('/:category(politics|business|entertainment|sports|tech|science|live|arts|justice)', function(req, res) {
	var config = res.locals.config;
	var category = req.params.category;
	var url = 'http://news.' + config.domain + '/' + category;
	res.redirect(301, url);
});
