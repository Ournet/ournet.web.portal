'use strict';

var _ = require('../utils')._;
var fs = require('fs');
var path = require('path');

var config = {
	assets: require('./assets'),
  languagesNames: {
    ro: 'Română',
    ru: 'Русский',
    bg: 'Български'
  },
  monthFormat: 'D MMMM',
  favicon: 'http://assets.ournetcdn.net/ournet/img/icons/ournet-icon-16.png',
  international: {
    md: {
      it: 'Moldova',
      en: 'Moldova',
      ro: 'Moldova',
      ru: 'Молдова',
      bg: 'Молдова',
      cs: 'Moldavsko',
      hu: 'Moldova',
      pl: 'Mołdawia',
      sq: 'Moldavi',
      url: 'http://www.click.md'
    },
    ro: {
      it: 'Romania',
      en: 'Romania',
      ro: 'România',
      ru: 'Румыния',
      bg: 'Румъния',
      cs: 'Rumunsko',
      hu: 'Románia',
      pl: 'Rumunia',
      sq: 'Rumani',
      url: 'http://www.ournet.ro'
    },
    ru: {
      it: 'Russia',
      en: 'Russia',
      ro: 'Rusia',
      ru: 'Россия',
      bg: 'Руска федерация',
      cs: 'Rusko',
      hu: 'Oroszországi Föderáció',
      pl: 'Rosja',
      sq: 'Rusi',
      url: 'http://www.zborg.ru'
    },
    it: {
      it: 'Italia',
      en: 'Italy',
      ro: 'Italia',
      ru: 'Италия',
      bg: 'Италия',
      cs: 'Itálie',
      hu: 'Olaszország',
      pl: 'Włochy',
      sq: 'Itali',
      url: 'http://www.ournet.it'
    },
    bg: {
      it: 'Bulgaria',
      en: 'Bulgaria',
      ro: 'Bulgaria',
      ru: 'Болгария',
      cs: 'Bulharsko',
      hu: 'Bulgária',
      pl: 'Bułgaria',
      sq: 'Bulgari',
      url: 'http://www.ournet.bg'
    },
    hu: {
      it: 'Hungary',
      en: 'Hungary',
      ro: 'Ungaria',
      ru: 'Венгрия',
      bg: 'Унгария',
      cs: 'Maďarsko',
      pl: 'Węgry',
      sq: 'Hungari',
      url: 'http://www.ournet.hu'
    },
    cz: {
      it: 'Cehia',
      en: 'Czech Republic',
      ro: 'Cehia',
      ru: 'Чехия',
      bg: 'Чешка република',
      hu: 'Csehország',
      pl: 'Czechy',
      sq: 'Republika Çeke',
      url: 'http://www.ournet.cz'
    },
    pl: {
      it: 'Poland',
      en: 'Poland',
      ro: 'Polonia',
      ru: 'Польша',
      bg: 'Полша',
      cs: 'Polsko',
      hu: 'Lengyelország',
      sq: 'Poloni',
      url: 'http://www.diez.pl'
    },
    'in': {
      it: 'India',
      en: 'India',
      ro: 'India',
      ru: 'Индия',
      bg: 'Индия',
      cs: 'Indie',
      hu: 'India',
      pl: 'Indie',
      sq: 'Indi',
      url: 'http://www.ournet.in'
    },
    al: {
      it: 'Albania',
      en: 'Albania',
      ro: 'Albania',
      ru: 'Албания',
      bg: 'Албания',
      cs: 'Albánie',
      hu: 'Albánia',
      pl: 'Albania',
      sq: 'Shqipëri',
      url: 'http://www.moti2.al'
    }
  },
  shareDataServices: ['facebook', 'twitter', 'odnoklassniki', 'google-plus'],
  getHtmlFooter: function() {
    if (typeof this.htmlFooter === 'undefined') {
      var file = path.join(__dirname, this.country + '/footer.html');
      this.htmlFooter = null;
      if (fs.existsSync(file)) {
        this.htmlFooter = fs.readFileSync(file, 'utf8');
      }
    }
    return this.htmlFooter;
  }
};

var data = {};

module.exports = function(country) {
  if (!country) {
    throw new Error('Loading config for NO country');
  }
  if (!data[country]) {
    data[country] = _.assign({}, config, require('./' + country));
    data[country].getHtmlFooter();
  }

  return data[country];
};
