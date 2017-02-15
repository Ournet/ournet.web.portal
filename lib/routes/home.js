'use strict';

var express = require('express');
var utils = require('../utils');
var util = require('util');
/*eslint new-cap:1*/
var route = module.exports = express.Router();
const Data = require('../data');

//index

route.get('/:ul' + utils.localePrefix + '?', function(req, res, next) {
	var config = res.locals.config;

	utils.maxageIndex(res);

	var culture = res.locals.currentCulture,
		links = res.locals.links,
		__ = res.locals.__;

	// if (req.query.ul === 'ru') {
	// 	return res.redirect(301, links.home({
	// 		ul: req.query.ul
	// 	}));
	// }

	res.locals.site.head.canonical = 'http://' + config.host + links.portal.home({
		ul: culture.language
	});

	res.locals.site.head.title = util.format(__('site_title'), __('in_country_' + culture.country));

	var recentPeriod = new Date(res.locals.currentDate);
	recentPeriod.setHours(-72, 0, 0, 0);

	res.viewdata.latestStories = ['newsStories', { country: culture.country, lang: culture.language, where: '', limit: 9, order: '-_id' }];
	res.viewdata.latestQuotes = ['newsQuotes', { where: JSON.stringify({ country: culture.country, lang: culture.language }), limit: 9, order: '-createdAt' }];

	res.viewdata.popularStories = ['newsStories', { country: culture.country, lang: culture.language, where: JSON.stringify({ createdAt: { $gt: recentPeriod } }), limit: 3, order: '-countShares' }];
	res.viewdata.importantStories = ['newsStories', { country: culture.country, lang: culture.language, where: JSON.stringify({ isImportant: true }), limit: 3, order: '-_id' }];

	Data.get(res.viewdata).then(function(result) {
		// console.log(result);
		return res.render('index', result);
	}, next);
});
