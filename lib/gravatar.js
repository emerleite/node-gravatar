var crypto = require('crypto')
  , querystring = require('querystring')
  , baseURI = 'http://www.gravatar.com/avatar/';

var gravatar = module.exports = {
    url: function (email, options) {
      var query = (options && "?" + querystring.stringify(options)) || "";
      return baseURI + crypto.createHash('md5').update(email.toLowerCase()).digest('hex') + query;
    }
};
