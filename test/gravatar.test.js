var testCase = require('nodeunit').testCase
  , url = require('url')
  , gravatar = require('../lib/gravatar')
  , baseURL = "http://www.gravatar.com/avatar/"
  , baseSecureURL = "https://secure.gravatar.com/avatar/";

module.exports = testCase({
  'it should gererate correct uri given an email': function(test) {
    test.equal(gravatar.url('emerleite@gmail.com'), baseURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
    test.equal(gravatar.url('emerleite@yahoo.com.br'), baseURL + "6c47672b0d58bd6aae4fa70920cb3ee4");
    test.done();
  },
  'it should generate same uri ignoring case': function(test) {
    test.ok(gravatar.url('EMERLEITE@gmAil.com'), baseURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
    test.ok(gravatar.url('emerleite@YAHOO.com.BR'), baseURL + "6c47672b0d58bd6aae4fa70920cb3ee4");
    test.done();
  },
  'it should generate uri with user passed parameters': function(test) {
    var gravatarURL = gravatar.url('emerleite@gmail.com', { s: '200', f: 'y', r: 'g', d: '404'});
    var queryString = url.parse(gravatarURL, true).query;
    test.equal(queryString.s, '200');
    test.equal(queryString.f, 'y');
    test.equal(queryString.r, 'g');
    test.equal(queryString.d, '404');
    test.done();
  },
  'it should allow https gravatar uri generation': function(test) {
    var gravatarURL = gravatar.url('emerleite@gmail.com', {}, true);
    test.equal(gravatar.url('emerleite@gmail.com', {}, true), baseSecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
    test.done();
  }
});
