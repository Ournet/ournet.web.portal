var external = module.exports;
var Webdata = require('ournet.data.webdata');
var Entities = require('entitizer.entities-storage');
var Stories = require('ournet.data.stories');
var Quotes = require('ournet.data.quotes');

external.topics = {
  // access: new Entities.AccessService(),
  // util: Topics.utils,
  categories: Entities.categories
};

external.webdata = {
  access: Webdata.getAccessService(),
  // control: Webdata.getControlService(),
  search: Webdata.Search
};

external.stories = {
  access: new Stories.AccessService(),
  // control: new Stories.ControlService(),
  // search: Stories.Search
};

external.quotes = {
  access: new Quotes.AccessService()
    // control: new Quotes.ControlService()
};
