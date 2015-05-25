var crypto = require('crypto')
  , querystring = require('querystring');

var gravatar = module.exports = {
    url: function (email, options, protocol) {
      email = email || 'unspecified';
      var baseURL;

      if(typeof protocol === 'undefined'){
        baseURL = "//www.gravatar.com/avatar/";
      } else {
        baseURL = protocol ? "https://s.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
      }

      var queryData = querystring.stringify(options);
      var query = (queryData && "?" + queryData) || "";

      return baseURL + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex') + query;
    }
};
