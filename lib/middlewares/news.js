'use strict';

var _package = require('../../package.json');
var utils = require('../utils');
var entipicUrl = require('entipic.url');
const Data = require('../data');

var util = {
	moment: utils.moment,
	format: require('util').format,
	startWithUpperCase: utils.startWithUpperCase,
	numberFormat: utils.number.format,
	wrapAt: utils.wrapAt,
	url: require('url'),
	htmlText: function(text) {
		if (!text) {
			return text;
		}
		return text.trim().replace(/\n/g, '<br/><br/>');
	},
	toUrl: function(item) {
		return '/url?url=' + encodeURIComponent(item.host + item.path);
	},
	entipicImage: function(topic, culture, size) {
		return entipicUrl(topic.wikiName || topic.name, size, culture.language, culture.country);
	},
	summaryToParagraphs: utils.summaryToParagraphs,
	weather: Data.weather,
	Place: Data.Place,
	signName: Data.signName,
	utm: {
		horoscope: { utm_source: 'ournet', utm_campaign: 'www-horoscope' },
		news: { utm_source: 'ournet', utm_campaign: 'www-news' },
		exchange: { utm_source: 'ournet', utm_campaign: 'www-exchange' }
	}
};

module.exports = function(req, res, next) {
	var config = res.locals.config;
	var culture = res.locals.currentCulture;
	const links = res.locals.links;
	const language = culture.language;
	const country = culture.country;

	// res.locals.selectedMenuType = 'news';

	res.locals.project = {
		version: _package.version,
		name: 'portal',
		portalsAbroad: []
	};

	//res.locals.noGoogleAds = true;

	res.locals.util = util;

	res.locals.newsUrl = function(url) {
		return '//' + links.news.$host + url;
	};

	res.locals._events = [];

	utils.maxage(res, 60);

	res.viewdata.trendingTopics = ['trendingTopics', {
		where: JSON.stringify({
			country: culture.country,
			lang: culture.lang
		}),
		limit: 8,
		order: '-counts.trend24h'
	}];

	// res.viewdata.holidays = ['holidays', { country: country, lang: language }];
	res.viewdata.capitalCity = ['placeCurrentForecast', { placeId: config.capitalId }];
	if (config.projects.exchange) {
		const rateKeys = [];
		const date = utils.formatDate(res.locals.currentDate.toDate());

		for (var i = 0; i < 2; i++) {
			rateKeys.push([country, date, config.exchange.currencies[i], config.exchange.source].join('').toUpperCase());
		}

		res.viewdata.mainExchangeRates = ['mainExchangeRates', { keys: rateKeys }];
		res.viewdata.mainExchangeSource = ['exchangeSource', { country: country, sourceId: config.exchange.source }];
	}

	next();
};
