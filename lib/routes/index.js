'use strict';

var middlewares = require('../middlewares');

exports = module.exports = function(app) {
	app.use(require('./redirect'));
	app.use(middlewares.root);
	app.use(middlewares.news);
	app.use(require('./home'));
};
