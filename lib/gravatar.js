var crypto = require('crypto')
  , querystring = require('querystring');

var MD5_REGEX = /^[0-9a-f]{32}$/;

function params(options) {
  var params = {}, removing = {protocol:1, format:1};
  for (var key in options) {
    if (!removing[key]) params[key] = options[key];
  }
  return params;
}
function proto(options, protocol) {
  if (!options) return;
  return options.protocol === "http" ? false
       : options.protocol === "https" ? true
       : undefined;
}

var gravatar = module.exports = {
    url: function (email, options, protocol) {
      var baseURL;

      if (options && options.protocol) protocol = proto(options);

      if(typeof protocol === 'undefined'){
        baseURL = "//www.gravatar.com/avatar/";
      } else {
        baseURL = protocol ? "https://s.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
      }

      var queryData = querystring.stringify(params(options));
      var query = (queryData && "?" + queryData) || "";

      return baseURL + getHash(email) + query;
    },
    profile_url: function (email, options, https) {
      email = email.trim().toLowerCase();
      var hash = email.match(MD5_REGEX) ? email : crypto.createHash('md5').update(email).digest('hex');
      var format = options != undefined && options.format != undefined ?  String(options.format) : 'json'

      if (options && options.protocol) https = proto(options);
      var baseURL = (https && "https://secure.gravatar.com/") || 'http://www.gravatar.com/';
      var queryData = querystring.stringify(params(options));
      var query = (queryData && "?" + queryData) || "";

      return baseURL + getHash(email) + '.' + format + query;
    }
};

function getHash(email){
  email = email || 'unspecified';
  email = email.trim().toLowerCase();
  return email.match(MD5_REGEX) ? email : crypto.createHash('md5').update(email).digest('hex');
}
