'use strict';

var config = require('./config');
var urlset = require('urlset');
var path = require('path');
const Links = require('ournet.links');

var hosts = {
	'www.click.md': 'md',
	'www.ournet.ro': 'ro',
	'www.zborg.ru': 'ru',
	'www.ournet.bg': 'bg',
	'www.ournet.hu': 'hu',
	'www.diez.pl': 'pl',
	'www.ournet.in': 'in',
	'www.ournet.cz': 'cz',
	'www.ournet.it': 'it'
};

function getCountry(req) {
	// return ['md', 'ro', 'ru', 'bg', 'hu', 'pl', 'in', 'cz'][getRandomInt(0, 6)];
	return hosts[req.hostname] || process.env.COUNTRY;
}

var links = {};

function getLinks(country, language) {
	if (!links[country]) {
		links[country] = Links.country(country, language);
	}
	return links[country];
}

module.exports = function(req, res, next) {
	var country = getCountry(req);
	if (!country) {
		return next(new Error('Invalid hostname', {
			hostname: req.hostname
		}));
	}
	var conf = config(country);
	res.locals.config = conf;
	res.locals.links = getLinks(conf.country, conf.language);
	res.locals.Links = Links;
	next();
};
