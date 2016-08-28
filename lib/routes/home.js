'use strict';

var express = require('express');
var utils = require('../utils');
var util = require('util');
/*eslint new-cap:1*/
var route = module.exports = express.Router();

//index

route.get('/:ul' + utils.localePrefix + '?', function(req, res, next) {
	var config = res.locals.config;

	utils.maxageIndex(res);

	var currentCulture = res.locals.currentCulture,
		links = res.locals.links,
		__ = res.locals.__;

	if (req.query.ul === 'ru') {
		return res.redirect(301, links.home({
			ul: req.query.ul
		}));
	}

	res.locals.site.head.canonical = 'http://' + config.host + links.home({
		ul: currentCulture.language
	});

	res.locals.site.head.title = util.format(__('site_title'), __('in_country_' + currentCulture.country));

	var recentPeriod = new Date(res.locals.currentDate);
	recentPeriod.setHours(-24, 0, 0, 0);

	res.viewdata.set({
		latestStories: {
			source: 'storiesNews',
			params: {
				culture: currentCulture,
				limit: 9,
				order: '-createdAt',
				select: '_id'
			}
		},
		latestQuotes: {
			source: 'quotesNews',
			params: {
				where: {
					country: currentCulture.country,
					lang: currentCulture.lang
				},
				select: '_id',
				limit: 6,
				order: '-createdAt'
			}
		},
		popularStories: {
			source: 'newsStories',
			params: {
				culture: currentCulture,
				limit: 3,
				order: '-countShares',
				where: {
					createdAt: {
						'$gt': recentPeriod
					}
				},
				select: '_id title imageId host href uniqueName countShares countViews videos createdAt summary'
			}
		},
		importantStories: {
			params: {
				key: [currentCulture.country, currentCulture.language].join('_'),
				options: {
					limit: 3
				}
			}
		}
	});

	res.viewdata.get(res.locals, function(error) {
		if (error) {
			return next(error);
		}
		return res.render('index');
	});
});
