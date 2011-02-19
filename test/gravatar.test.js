var testCase = require('nodeunit').testCase
  , gravatar = require('../lib/gravatar')
  , baseURI = 'http://www.gravatar.com/avatar/';



module.exports = testCase({
  'it should gererate correct hash given an email': function(test) {
    test.ok(gravatar.url('emerleite@gmail.com') == baseURI + "93e9084aa289b7f1f5e4ab6716a56c3b");
    test.ok(gravatar.url('emerleite@yahoo.com.br') == baseURI + "6c47672b0d58bd6aae4fa70920cb3ee4");
    test.done();
  },
  'it should generate same url ignoring case': function(test) {
    test.ok(gravatar.url('EMERLEITE@gmAil.com') == baseURI + "93e9084aa289b7f1f5e4ab6716a56c3b");
    test.ok(gravatar.url('emerleite@YAHOO.com.BR') == baseURI + "6c47672b0d58bd6aae4fa70920cb3ee4");
    test.done();
  }
});
