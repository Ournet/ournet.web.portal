'use strict';

const Client = require('ournet.api.client');

module.exports = Client.create({
	api: {
		timeout: 5 * 1000,
		headers: {
			authorization: 'Key ' + process.env.OURNET_API_KEY
		}
	},
	cache: {
		// 1 minute
		places_place: 60 * 30,
		// 10 minutes
		places_places: 60 * 10,
		// 10 minutes
		news_stories: 60 * 10,
		// 30 minutes
		holidays: 60 * 60,
		// 1 minute
		weather_report: 60 * 1,
		// 60 minutes
		exchange_source: 60 * 60,
		// 30 minutes
		exchange_rates: 60 * 30,
		// no cache
		places_searchPlace: 0,
		// 60 minutes
		places_region: 60 * 60,
		// 60 minutes
		places_regions: 60 * 60,
		// 60 minutes
		places_placeoldid: 60 * 60,
		// 10 minutes
		news_trendTopics: 60 * 10,
		// 10 minutes
		news_quotes: 60 * 10
	}
});
