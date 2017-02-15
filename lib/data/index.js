'use strict';

const debug = require('debug')('ournet-portal:data');
const Data = require('ournet.web.data');
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
exports.get = Data.get;

exports.signsNames = function() {
	return signsNames;
};

exports.signName = function(id, lang) {
	return signsNames[id][lang];
};

exports.signNameBySlug = function(lang, slug) {
	return signsNamesBySlug[lang][slug];
};
