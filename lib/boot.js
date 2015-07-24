var config = require('./config'),
  urlset = require('urlset');

module.exports = function(req, res, next) {
  var country = getCountry(req);
  if (!country) {
    return next(new Error('Invalid hostname', {
      hostname: req.hostname
    }));
  }
  var conf = config(country);
  res.locals.config = conf;
  res.locals.links = getLinks(conf.country, conf.language);
  next();
};

var hosts = {
  'www.click.md': 'md',
  'www.ournet.ro': 'ro',
  'www.zborg.ru': 'ru',
  'www.ournet.bg': 'bg',
  'www.ournet.hu': 'hu',
  'www.diez.pl': 'pl',
  'www.ournet.in': 'in',
  'www.ournet.cz': 'cz',
  'www.ournet.it': 'it'
};

function getCountry(req) {
  return hosts[req.hostname] || process.env.COUNTRY;
}

var links = {};

function getLinks(country, language) {
  if (!links[country]) {
    var l = new urlset.Provider({
      params: []
    });
    l.load(__dirname + '/sitemap.json');
    l.setParam({
      name: 'ul',
      value: language,
      format: 's'
    });
    links[country] = l.url;

    links[country].wi = function(size, id) {
      return 'http://wi.ournetcdn.net/stories/' + id.substr(0, 4) + '/' + size + '/' + id + '.jpg';
    };
    links[country].wi.news = function(size, id) {
      return 'http://wi.ournetcdn.net/news/' + id.substr(0, 4) + '/' + size + '/' + id + '.jpg';
    };
  }
  return links[country];
}
