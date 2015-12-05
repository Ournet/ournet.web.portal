var express = require('express'),
  core = require('ournet.core'),
  _ = core._,
  Promise = core.Promise,
  util = require('util'),
  utils = require('../utils.js'),
  route = module.exports = express.Router(),
  ShareInfo = require('../share_info.js'),
  Data = require('../data');

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

  res.locals.shareInfo = ShareInfo({
    clientId: "index-" + currentCulture.lang,
    identifier: res.locals.site.head.canonical,
    url: res.locals.site.head.canonical,
    title: res.locals.site.head.title,
    summary: res.locals.site.head.description
  });

  var props = {
    stories: Data.webdata.access.stories({
      culture: currentCulture,
      limit: 5,
      order: '-createdAt',
      select: '_id'
    }).then(function(storiesIds) {
      if (!storiesIds || storiesIds.length === 0) return [];
      return Data.stories.access.stories({
        ids: _.pluck(storiesIds, 'id'),
        params: {
          AttributesToGet: utils.storiesAttributes
        },
        sort: true
      });
    }),
    latestNews: Data.webdata.access.webpages({
      culture: currentCulture,
      where: {
        imageId: {
          '$ne': null
        }
      },
      limit: 10,
      order: '-createdAt'
    }),
    quotes: Data.webdata.access.quotes({
      where: {
        country: currentCulture.country,
        lang: currentCulture.lang
      },
      select: '_id',
      limit: 2,
      order: '-createdAt'
    }).then(function(quotesIds) {
      return Data.quotes.access.quotes({
        ids: _.pluck(quotesIds, 'id'),
        // params: {
        //   AttributesToGet: utils.storiesAttributes
        // },
        sort: true
      })
    })
  };

  Promise.props(props).then(function(result) {
    //res.send(result);
    res.locals.mainStory = result.stories[0];
    res.locals.stories = result.stories.slice(1);
    res.locals.quotes = result.quotes;
    res.locals.oneList = {
      title: __('latest_news'),
      list: result.latestNews
    };
    res.render('index.jade');
  }).catch(next);
});
