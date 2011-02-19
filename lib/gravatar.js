var crypto = require('crypto')
  , baseURI = 'http://www.gravatar.com/avatar/';

var gravatar = module.exports = {
    url: function (email) {
      return baseURI + crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    }
};
