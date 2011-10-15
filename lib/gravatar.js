var crypto = require('crypto')
  , querystring = require('querystring');

var gravatar = module.exports = {
    url: function (email, options, https) {
      var baseURL = (https && "https://secure.gravatar.com/avatar/") || 'http://www.gravatar.com/avatar/';
      var queryData = querystring.stringify(options);
      var query = (queryData && "?" + queryData) || "";

      return baseURL + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex') + query;
    }
};
