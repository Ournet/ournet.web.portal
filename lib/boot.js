var config = require('./config');
var urlset = require('urlset');

// var memwatch = require('memwatch');

// memwatch.on('stats', function(stats) {
// 	console.log('stats', stats)
// });
// memwatch.on('leak', function(stats) {
// 	console.log('leak', stats)
// });

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
	next();
};

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

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getCountry(req) {
	// return ['md', 'ro', 'ru', 'bg', 'hu', 'pl', 'in', 'cz'][getRandomInt(0, 6)];
	return hosts[req.hostname] || process.env.COUNTRY;
}

var links = {};

function getLinks(country, language) {
	if (!links[country]) {
		var l = new urlset.Provider({
			params: []
		});
		l.load(__dirname + '/sitemap.json');
		l.setParam({
			name: 'ul',
			value: language,
			format: 's'
		});
		links[country] = l.url;

		links[country].wi = function(size, id) {
			return 'http://wi.ournetcdn.net/stories/' + id.substr(0, 4) + '/' + size + '/' + id + '.jpg';
		};
		links[country].wi.news = function(size, id) {
			return 'http://wi.ournetcdn.net/news/' + id.substr(0, 4) + '/' + size + '/' + id + '.jpg';
		};
	}
	return links[country];
}
