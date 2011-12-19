var should = require('should')
  , url = require('url')
  , gravatar = require('../lib/gravatar');

describe('gravatar', function() {
  var baseURL = "http://www.gravatar.com/avatar/";
  var baseSecureURL = "https://secure.gravatar.com/avatar/";

  it('should gererate correct uri given an email', function() {
    gravatar.url('emerleite@gmail.com').should.be.equal(baseURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
    gravatar.url('emerleite@yahoo.com.br').should.be.equal(baseURL + "6c47672b0d58bd6aae4fa70920cb3ee4");
  });

  it('should generate same uri ignoring case', function() {
    gravatar.url('EMERLEITE@gmAil.com').should.be.equal(baseURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
    gravatar.url('emerleite@YAHOO.com.BR').should.be.equal(baseURL + "6c47672b0d58bd6aae4fa70920cb3ee4");
  });

  it('should generate uri with user passed parameters', function() {
    var gravatarURL = gravatar.url('emerleite@gmail.com', { s: '200', f: 'y', r: 'g', d: '404'});
    var queryString = url.parse(gravatarURL, true).query;
    queryString.s.should.equal('200');
    queryString.f.should.equal('y');
    queryString.r.should.equal('g');
    queryString.d.should.equal('404');
  });

  it('should allow https gravatar uri generation', function() {
    var gravatarURL = gravatar.url('emerleite@gmail.com', {}, true);
    gravatar.url('emerleite@gmail.com', {}, true).should.equal(baseSecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
  });
});
