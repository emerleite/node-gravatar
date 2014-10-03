var crypto = require('crypto'),
    querystring = require('querystring');

var gravatar = module.exports = {
    url:function (email, options, https) {

        // Handle falsey emails being provided - populate with 'junk' so we get the default Gravatar image
        email = email || 'unspecified';

        var baseURL = (https && "https://secure.gravatar.com/avatar/") || 'http://www.gravatar.com/avatar/';
        var queryData = querystring.stringify(options);
        var query = (queryData && "?" + queryData) || "";

        return baseURL + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex') + query;
    }
};