var crypto = require('crypto')
  , querystring = require('querystring');

var MD5_REGEX = /[0-9a-f]{32}/;

var gravatar = module.exports = {
    url: function (email, options, protocol) {
      email = email || 'unspecified';
      email = email.trim().toLowerCase();
      var hash = email.match(MD5_REGEX) ? email : crypto.createHash('md5').update(email).digest('hex');
      var baseURL;

      if(typeof protocol === 'undefined'){
        baseURL = "//www.gravatar.com/avatar/";
      } else {
        baseURL = protocol ? "https://s.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
      }

      var queryData = querystring.stringify(options);
      var query = (queryData && "?" + queryData) || "";

      return baseURL + hash + query;
    },
    profile_url: function (email, options, https) {
      email = email.trim().toLowerCase();
      var hash = email.match(MD5_REGEX) ? email : crypto.createHash('md5').update(email).digest('hex');
      var format = options != undefined && options.format != undefined ?  String(options.format) : 'json'
      //delete options.format
      if (options != undefined && options.format != undefined) delete options.format
      var baseURL = (https && "https://secure.gravatar.com/") || 'http://www.gravatar.com/';
      var queryData = querystring.stringify(options);
      var query = (queryData && "?" + queryData) || "";

      return baseURL + hash + '.' + format + query;
    }
};
