var crypto = require('crypto')
  , querystring = require('querystring')
  , baseHostPath = 'www.gravatar.com/avatar/';

var gravatar = module.exports = {
    url: function (email, options, https) {
      var baseURL = (https && "https://") || "http://" + baseHostPath;
      var query = (options && "?" + querystring.stringify(options)) || "";

      return baseURL + crypto.createHash('md5').update(email.toLowerCase()).digest('hex') + query;
    }
};
