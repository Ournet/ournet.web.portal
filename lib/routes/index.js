var middlewares = require('../middlewares');

exports = module.exports = function(app) {
  app.use(require('./json.js'));
  app.use(middlewares.root);
  app.use(require('./redirect.js'));
  app.use(middlewares.news);
  app.use(require('./home.js'));
};
