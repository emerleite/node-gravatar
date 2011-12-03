var crypto = require('crypto'),
    querystring = require('querystring'),
    url = require('url'),
    http = require('http'),
    https = require('https');

/**
 * Picture object
 *
 * Picture.length data size.
 * Picture.data is Buffer, you can write it or handle it a string.
 * Picture.mime mime type.
 * Picture.gravatar the gravatar object.
 */
function Picture(gravatar) {
    this.gravatar = gravatar;
}

function Gravatar(email) {
    this.email = email.trim().toLowerCase();
}

/**
 * Compute gravatar signature
 */
Gravatar.prototype.hash = function() {
    return crypto.createHash('md5').update(this.email).digest('hex');
};

/**
 * Build url
 */
Gravatar.prototype.url = function(options, secure) {
    options = options ? options : {};
    secure = secure ? secure : false;
    var baseURL = (secure && "https://secure.gravatar.com/avatar/") || 'http://www.gravatar.com/avatar/';
    var queryData = querystring.stringify(options);
    var query = (queryData && "?" + queryData) || "";

    return baseURL + this.hash() + query;
};

/**
 * Fetch a picture
 */
Gravatar.prototype.fetch = function(cb, options, secure){
    var that = this;
    var u = url.parse(this.url(options, secure));
    var protocol = (u.protocol === 'http:') ? http : https;
    protocol.get(u, function(res) {
        var p = new Picture(that);
        p.length = parseInt(res.headers['content-length'], 10);
        p.mime = res.headers['content-type'];
        p.last = res.headers['last-modified'];
        p.data = new Buffer(p.length);
        var copied = 0;
        res.on('data', function(chunk){
            chunk.copy(p.data, copied);
            copied += chunk.length;
        });
        res.on('end', function() {
            cb(p)
        });
    });
};

exports.Gravatar = Gravatar;

exports.url = function(email, options, secure) {
    var g = new Gravatar(email);
    return g.url(options, secure)
}
