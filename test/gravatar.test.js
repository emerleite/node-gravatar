var testCase = require('nodeunit').testCase
  , url = require('url')
  , gravatar = require('../lib/gravatar')
  , baseURI = 'http://www.gravatar.com/avatar/';

module.exports = testCase({
  'it should gererate correct uri given an email': function(test) {
    test.equal(gravatar.url('emerleite@gmail.com'), baseURI + "93e9084aa289b7f1f5e4ab6716a56c3b");
    test.equal(gravatar.url('emerleite@yahoo.com.br'), baseURI + "6c47672b0d58bd6aae4fa70920cb3ee4");
    test.done();
  },
  'it should generate same uri ignoring case': function(test) {
    test.ok(gravatar.url('EMERLEITE@gmAil.com'), baseURI + "93e9084aa289b7f1f5e4ab6716a56c3b");
    test.ok(gravatar.url('emerleite@YAHOO.com.BR'), baseURI + "6c47672b0d58bd6aae4fa70920cb3ee4");
    test.done();
  },
  'it should generate uri with user passed parameters': function(test) {
    var gravatarURI = gravatar.url('emerleite@gmail.com', { s: '200', f: 'y', r: 'g', d: '404'});
    var queryString = url.parse(gravatarURI, true).query;
    test.equal(queryString.s, '200');
    test.equal(queryString.f, 'y');
    test.equal(queryString.r, 'g');
    test.equal(queryString.d, '404');
    test.done();
  }
});
