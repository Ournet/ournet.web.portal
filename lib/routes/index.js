var middlewares = require('../middlewares');
// var memwatch = require('memwatch');

exports = module.exports = function(app) {
	// app.use(function(req, res, next) {
	// 	res.locals.hd = new memwatch.HeapDiff();
	// 	next();
	// });
	app.use(require('./json.js'));
	app.use(require('./redirect.js'));
	app.use(middlewares.root);
	app.use(middlewares.news);
	// app.use(function(req, res, next) {
	// 	var diff = res.locals.hd.end();
	// 	console.log(req.url);
	// 	console.log('diff', diff);
	// 	next();
	// });
	app.use(require('./home.js'));
};
