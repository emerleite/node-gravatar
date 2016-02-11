var crypto = require('crypto')
  , querystring = require('querystring');

var MD5_REGEX = /^[0-9a-f]{32}$/;

var gravatar = module.exports = {
    url: function (email, options, protocol) {
      var baseURL;
      if(typeof protocol === 'undefined'){
        baseURL = "//www.gravatar.com/avatar/";
      } else {
        baseURL = protocol ? "https://s.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
      }

      var queryData = querystring.stringify(options);
      var query = queryData ? ("?" + queryData) : "";

      return baseURL + getHash(email) + query;
    },
    profile_url: function (email, options, https) {
      var baseUrl = (typeof secure === 'undefined') ? "//www.gravatar.com/" : (secure ? "https://s.gravatar.com/" : "http://www.gravatar.com/");

      //Default format is json, replace
      var format = "json";
      if(options != undefined && options.format != undefined){
        format = options.format;
        delete options.format;  //Delete so that it is not included in the querystring
      }

      var baseURL = (https && "https://secure.gravatar.com/") || 'http://www.gravatar.com/';

      var queryData = querystring.stringify(options);
      var query = (queryData && "?" + queryData) || "";

      return baseURL + getHash(email) + '.' + format + query;
    }
};

function getHash(email){
  email = email || 'unspecified';
  email = email.trim().toLowerCase();
  return email.match(MD5_REGEX) ? email : crypto.createHash('md5').update(email).digest('hex');
}
