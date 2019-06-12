'use-strict';

const md5 = require('blueimp-md5');
const querystring = require('querystring');
const MD5_REGEX = /^[0-9a-f]{32}$/;

function params(options) {
  const params = {};
  const removing = { protocol: 1, format: 1 };

  for (const key in options) {
    if (!removing[key]) params[key] = options[key];
  }
  return params;
}

function proto(options, protocol) {
  if (!options) return;
  if (typeof options.protocol === 'boolean') return options.protocol;
  return options.protocol === 'http' ? false
    : options.protocol === 'https' ? true : undefined;
}

function getHash(email) {
  email = (typeof email === 'string') ? email.trim().toLowerCase() : 'unspecified';
  return email.match(MD5_REGEX) ? email : md5(email);
}

function getQueryString(options) {
  const queryData = querystring.stringify(params(options));
  return (queryData && '?' + queryData) || '';
}

module.exports = {
  url: function (email, options, protocol) {
    let baseURL = '//www.gravatar.com/avatar/';
    if (options && options.cdn) {
      baseURL = `${options.cdn}/avatar/`;
      delete options.cdn;
    } else {
      if (options && options.protocol) protocol = proto(options);
      if (typeof protocol !== 'undefined') {
        baseURL = protocol ? 'https://s.gravatar.com/avatar/' : 'http://www.gravatar.com/avatar/';
      }
    }
    const query = getQueryString(options);
    return baseURL + getHash(email) + query;
  },

  profile_url: function (email, options, https) {
    const format = options !== undefined && options.format !== undefined ? String(options.format) : 'json';
    let baseURL = '';
    if (options && options.cdn) {
      baseURL = `${options.cdn}/`;
      delete options.cdn;
    } else {
      if (options && options.protocol) https = proto(options);
      baseURL = (https && 'https://secure.gravatar.com/') || 'http://www.gravatar.com/';
    }
    const query = getQueryString(options);
    return `${baseURL}${getHash(email)}.${format}${query}`;
  }
};
