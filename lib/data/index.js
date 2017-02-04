'use strict';

const debug = require('debug')('ournet-portal:data');
const client = require('./client');
const properties = require('./properties');
let signsNames;
const signsNamesBySlug = {};
const logger = require('../logger');

exports.weather = require('./weather');
exports.Place = require('./place');

exports.init = function() {
	return exports.get({ signsNames: ['horoscopeSignsNames'] })
		.then(function(reslut) {
			signsNames = reslut.signsNames;

			Object.keys(signsNames).forEach(id => {
				const signName = signsNames[id];
				// console.log('signName', signName);
				Object.keys(signName).forEach(lang => {
					signsNamesBySlug[lang] = signsNamesBySlug[lang] || {};
					signsNamesBySlug[lang][signName[lang].slug] = signName[lang];
					signsNamesBySlug[lang][signName[lang].slug].id = id;
				});
			});

			// console.log(signsNamesBySlug);
		});
};

// {place:['place',{placeForecast:1002}]}
exports.get = function(props) {
	debug('getting data by props:', props);
	const data = {};
	var propertyKey;
	var variables;
	var property;

	for (var dataKey in props) {
		propertyKey = props[dataKey][0];
		variables = props[dataKey].length > 1 ? props[dataKey][1] : {};

		property = properties[propertyKey];
		data[dataKey] = {
			query: property.query,
			name: property.name,
			variables: variables
		};
	}

	debug('getting data by data:', data);

	return client.query(data)
		.then(function(result) {
			if (result && result.errors) {
				logger.error(result.errors);
			}
			return result;
		});
};

exports.signsNames = function() {
	return signsNames;
};

exports.signName = function(id, lang) {
	return signsNames[id][lang];
};

exports.signNameBySlug = function(lang, slug) {
	return signsNamesBySlug[lang][slug];
};
