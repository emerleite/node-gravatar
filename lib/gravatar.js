var md5 = require('blueimp-md5'),
    querystring = require('querystring'),
    MD5_REGEX = /^[0-9a-f]{32}$/;

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
function getHash(email){
  email = (typeof email === 'string') ? email.trim().toLowerCase() : 'unspecified';
  return email.match(MD5_REGEX) ? email : md5(email);
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
      var format = options != undefined && options.format != undefined ?  String(options.format) : 'json'
      if (options && options.protocol) https = proto(options);
      var baseURL = (https && "https://secure.gravatar.com/") || 'http://www.gravatar.com/';
      var queryData = querystring.stringify(params(options));
      var query = (queryData && "?" + queryData) || "";
      return baseURL + getHash(email) + '.' + format + query;
    }
};
