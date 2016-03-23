var should = require('should')
  , url = require('url')
  , nixt = require("nixt")
  , gravatar = require('../lib/gravatar')

describe('gravatar', function() {
  var baseNoProtocolURL = "//www.gravatar.com/avatar/";
  var baseUnsecureURL = "http://www.gravatar.com/avatar/";
  var baseSecureURL = "https://s.gravatar.com/avatar/";
  var profileURL = "http://www.gravatar.com/";
  var profileSecureURL = "https://secure.gravatar.com/";

  it('should gererate correct uri given an email', function() {
    gravatar.url('emerleite@gmail.com').should.be.equal(baseNoProtocolURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
    gravatar.url('emerleite@yahoo.com.br').should.be.equal(baseNoProtocolURL + "6c47672b0d58bd6aae4fa70920cb3ee4");
    gravatar.url('93E9084AA289B7F1F5E4AB6716A56C3B@gmail.com').should.be.equal(baseNoProtocolURL + "45503aaa7bc259c0ef5bba9997b77875");
  });

  it('should generate same uri ignoring case', function() {
    gravatar.url('EMERLEITE@gmAil.com').should.be.equal(baseNoProtocolURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
    gravatar.url('emerleite@YAHOO.com.BR').should.be.equal(baseNoProtocolURL + "6c47672b0d58bd6aae4fa70920cb3ee4");
  });

  it('should detect MD5 hashes and not hash them again', function() {
    gravatar.url('93e9084aa289b7f1f5e4ab6716a56c3b').should.be.equal(baseNoProtocolURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
    gravatar.url('93E9084AA289B7F1F5E4AB6716A56C3B').should.be.equal(baseNoProtocolURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
  });

  it('should generate uri with user passed parameters', function() {
    var gravatarURL = gravatar.url('emerleite@gmail.com', { s: '200', f: 'y', r: 'g', d: '404'});
    var queryString = url.parse(gravatarURL, true).query;
    queryString.s.should.equal('200');
    queryString.f.should.equal('y');
    queryString.r.should.equal('g');
    queryString.d.should.equal('404');
  });

  it('should force http protocol on gravatar uri generation', function() {
    gravatar.url('emerleite@gmail.com', {}, false).should.be.equal(baseUnsecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
    gravatar.url('emerleite@yahoo.com.br', {}, false).should.be.equal(baseUnsecureURL + "6c47672b0d58bd6aae4fa70920cb3ee4");
  });

  it('should force https protocol on gravatar uri generation', function() {
    var gravatarURL = gravatar.url('emerleite@gmail.com', {}, true);
    gravatar.url('emerleite@gmail.com', {}, true).should.equal(baseSecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
  });

  it('should handle falsey values for the email property', function () {
    gravatar.url(null).should.be.ok;
    gravatar.url(undefined).should.be.ok;
    gravatar.url('').should.be.ok;
  });

  it('should generate profile url', function() {
    gravatar.profile_url('emerleite@gmail.com', {}, true).should.equal(profileSecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b.json");
    gravatar.profile_url('emerleite@gmail.com', {format:'xml'}, true).should.equal(profileSecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b.xml");
    gravatar.profile_url('emerleite@gmail.com', {format:'qr'}, true).should.equal(profileSecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b.qr");
    gravatar.profile_url('emerleite@gmail.com').should.equal(profileURL + "93e9084aa289b7f1f5e4ab6716a56c3b.json");
  });

  it('should force http protocol on gravatar uri generation via options', function() {
    gravatar.url('emerleite@gmail.com', {protocol: 'http'}).should.be.equal(baseUnsecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
    gravatar.url('emerleite@yahoo.com.br', {protocol: 'http'}).should.be.equal(baseUnsecureURL + "6c47672b0d58bd6aae4fa70920cb3ee4");
  });

  it('should force https protocol on gravatar uri generation via options', function() {
    gravatar.url('emerleite@gmail.com', {protocol: 'https'}).should.equal(baseSecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b");
  });

  it('should generate uri with user passed parameters and protocol in options', function() {
    var gravatarURL = gravatar.url('emerleite@gmail.com', {protocol: 'https', s: '200', f: 'y', r: 'g', d: '404'});
    var queryString = url.parse(gravatarURL, true).query;
    queryString.should.eql({s: '200', f: 'y', r: 'g', d: '404'});
  });

  it('should generate profile url with protocol in options', function() {
    gravatar.profile_url('emerleite@gmail.com', {protocol: 'https'}).should.equal(profileSecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b.json");
    gravatar.profile_url('emerleite@gmail.com', {protocol: 'https', format:'xml'}).should.equal(profileSecureURL + "93e9084aa289b7f1f5e4ab6716a56c3b.xml");
    gravatar.profile_url('emerleite@gmail.com', {protocol: 'http', format:'qr'}).should.equal(profileURL + "93e9084aa289b7f1f5e4ab6716a56c3b.qr");
    gravatar.profile_url('emerleite@gmail.com').should.equal(profileURL + "93e9084aa289b7f1f5e4ab6716a56c3b.json");
  });

});

describe("CLI", function() {

  it("accepts an email argument and writes gravatar URL to STDOUT", function(done) {
    nixt()
      .run('./cli.js zeke@sikelianos.com')
      .stdout('https://s.gravatar.com/avatar/8f344b1c4bdcfc28bd848e97e94c3523?size=500&default=retro')
      .end(done)
  })

  it("outputs usage if no arg is present", function(done) {
    nixt()
      .run('./cli.js')
      .stdout(/Usage/)
      .end(done)
  })

})
