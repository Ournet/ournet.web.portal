'use strict';

var _package = require('../../package.json');
var utils = require('../utils');
var entipicUrl = require('entipic.url');

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
	summaryToParagraphs: utils.summaryToParagraphs
};

module.exports = function(req, res, next) {
	var config = res.locals.config;
	var culture = res.locals.currentCulture;

	// res.locals.selectedMenuType = 'news';

	res.locals.project = {
		version: _package.version,
		name: 'portal',
		portalsAbroad: []
	};

	//res.locals.noGoogleAds = true;

	res.locals.util = util;

	res.locals._events = [];

	utils.maxage(res, 60);

	res.viewdata.set({
		exchangeWidget: !!config.projects.exchange,
		weatherWidget: true,
		trendingTopics: {
			params: {
				where: {
					country: culture.country,
					lang: culture.lang
				},
				limit: 8,
				order: '-counts.trend24h'
			}
		}
	});


	res.locals.newsUrl = function(url) {
    return 'http://' + config.projects.news + url;
  };

  res.locals.weatherUrl = function(url) {
    return 'http://' + config.projects.weather + url;
  };

	next();
};
