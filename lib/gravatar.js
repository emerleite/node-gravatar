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
    },
    profile_url: function (email, options, https) {
      var format = options != undefined && options.format != undefined ?  String(options.format) : 'json'
      //delete options.format
      if (options != undefined && options.format != undefined) delete options.format
      var baseURL = (https && "https://secure.gravatar.com/") || 'http://www.gravatar.com/';
      var queryData = querystring.stringify(options);
      var query = (queryData && "?" + queryData) || "";

      return baseURL + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex') + '.' + format + query;
    }
};
