'use strict';

/* eslint-env mocha */

require('should');
const { URL } = require('url');
const gravatar = require('..');
const nixt = require('nixt');
const normalizeUrl = require('normalize-url');

const parseUrl = url => new URL(normalizeUrl(url));

describe('gravatar', function () {
  const baseNoProtocolURL = '//gravatar.com/avatar/';
  const baseUnsecureURL = 'http://gravatar.com/avatar/';
  const baseSecureURL = 'https://gravatar.com/avatar/';
  const profileURL = 'http://gravatar.com/';
  const profileSecureURL = 'https://gravatar.com/';
  const unspecifiedHash = 'd415f0e30c471dfdd9bc4f827329ef48';

  it('should gererate correct uri given an email', function () {
    gravatar.url('emerleite@gmail.com').should.be.equal(baseNoProtocolURL + '93e9084aa289b7f1f5e4ab6716a56c3b');
    gravatar.url('emerleite@yahoo.com.br').should.be.equal(baseNoProtocolURL + '6c47672b0d58bd6aae4fa70920cb3ee4');
    gravatar.url('93E9084AA289B7F1F5E4AB6716A56C3B@gmail.com').should.be.equal(baseNoProtocolURL + '45503aaa7bc259c0ef5bba9997b77875');
  });

  it('should generate same uri ignoring case', function () {
    gravatar.url('EMERLEITE@gmAil.com').should.be.equal(baseNoProtocolURL + '93e9084aa289b7f1f5e4ab6716a56c3b');
    gravatar.url('emerleite@YAHOO.com.BR').should.be.equal(baseNoProtocolURL + '6c47672b0d58bd6aae4fa70920cb3ee4');
  });

  it('should detect MD5 hashes and not hash them again', function () {
    gravatar.url('93e9084aa289b7f1f5e4ab6716a56c3b').should.be.equal(baseNoProtocolURL + '93e9084aa289b7f1f5e4ab6716a56c3b');
    gravatar.url('93E9084AA289B7F1F5E4AB6716A56C3B').should.be.equal(baseNoProtocolURL + '93e9084aa289b7f1f5e4ab6716a56c3b');
  });

  it('should generate uri with user passed parameters', function () {
    const gravatarURL = gravatar.url('emerleite@gmail.com', { s: 200, f: 'y', r: 'g', d: '404' });
    const { searchParams } = parseUrl(gravatarURL);
    searchParams.get('s').should.equal('200');
    searchParams.get('f').should.equal('y');
    searchParams.get('r').should.equal('g');
    searchParams.get('d').should.equal('404');
  });

  it('should force http protocol on gravatar uri generation', function () {
    gravatar.url('emerleite@gmail.com', {}, false).should.be.equal(baseUnsecureURL + '93e9084aa289b7f1f5e4ab6716a56c3b');
    gravatar.url('emerleite@yahoo.com.br', {}, false).should.be.equal(baseUnsecureURL + '6c47672b0d58bd6aae4fa70920cb3ee4');
  });

  it('should force https protocol on gravatar uri generation', function () {
    gravatar.url('emerleite@gmail.com', {}, true);
    gravatar.url('emerleite@gmail.com', {}, true).should.equal(baseSecureURL + '93e9084aa289b7f1f5e4ab6716a56c3b');
  });

  it('should handle falsey values for the email property', function () {
    /* eslint-disable no-unused-expressions */
    gravatar.url(null).should.be.ok;
    gravatar.url(undefined).should.be.ok;
    gravatar.url('').should.be.ok;
    /* eslint-enable */
  });

  it('should handle non string values for the email property', function () {
    gravatar.url({}, {}, true).should.equal(baseSecureURL + unspecifiedHash);
    gravatar.url(3, {}, true).should.equal(baseSecureURL + unspecifiedHash);
    gravatar.url(true, {}, true).should.equal(baseSecureURL + unspecifiedHash);
  });

  it('should generate profile url', function () {
    gravatar.profile_url('emerleite@gmail.com', {}, true).should.equal(profileSecureURL + '93e9084aa289b7f1f5e4ab6716a56c3b.json');
    gravatar.profile_url('emerleite@gmail.com', { format: 'xml' }, true).should.equal(profileSecureURL + '93e9084aa289b7f1f5e4ab6716a56c3b.xml');
    gravatar.profile_url('emerleite@gmail.com', { format: 'qr' }, true).should.equal(profileSecureURL + '93e9084aa289b7f1f5e4ab6716a56c3b.qr');
    gravatar.profile_url('emerleite@gmail.com').should.equal(profileURL + '93e9084aa289b7f1f5e4ab6716a56c3b.json');
  });

  it('should generate unspecified profile url when email is null', function () {
    gravatar.profile_url(null, {}, true).should.equal(profileSecureURL + unspecifiedHash + '.json');
    gravatar.profile_url(undefined, {}, true).should.equal(profileSecureURL + unspecifiedHash + '.json');
  });

  it('should force http protocol on gravatar uri generation via options', function () {
    gravatar.url('emerleite@gmail.com', { protocol: 'http' }).should.be.equal(baseUnsecureURL + '93e9084aa289b7f1f5e4ab6716a56c3b');
    gravatar.url('emerleite@yahoo.com.br', { protocol: 'http' }).should.be.equal(baseUnsecureURL + '6c47672b0d58bd6aae4fa70920cb3ee4');
  });

  it('should force https protocol on gravatar uri generation via options', function () {
    gravatar.url('emerleite@gmail.com', { protocol: 'https' }).should.equal(baseSecureURL + '93e9084aa289b7f1f5e4ab6716a56c3b');
  });

  it('should generate uri with user passed parameters and protocol in options', function () {
    const gravatarURL = gravatar.url('emerleite@gmail.com', { protocol: 'https', s: 200, f: 'y', r: 'g', d: '404' });
    const { searchParams } = parseUrl(gravatarURL);
    searchParams.get('s').should.equal('200');
    searchParams.get('f').should.equal('y');
    searchParams.get('r').should.equal('g');
    searchParams.get('d').should.equal('404');
  });

  it('should generate profile url with protocol in options', function () {
    gravatar.profile_url('emerleite@gmail.com', { protocol: 'https' }).should.equal(profileSecureURL + '93e9084aa289b7f1f5e4ab6716a56c3b.json');
    gravatar.profile_url('emerleite@gmail.com', { protocol: 'https', format: 'xml' }).should.equal(profileSecureURL + '93e9084aa289b7f1f5e4ab6716a56c3b.xml');
    gravatar.profile_url('emerleite@gmail.com', { protocol: 'http', format: 'qr' }).should.equal(profileURL + '93e9084aa289b7f1f5e4ab6716a56c3b.qr');
    gravatar.profile_url('emerleite@gmail.com').should.equal(profileURL + '93e9084aa289b7f1f5e4ab6716a56c3b.json');
  });

  it('should generate profile url with cdn in options', function () {
    const cdn = 'http://cdn-gravatar.wuweixing.com';
    gravatar.profile_url('emerleite@gmail.com', { cdn: cdn }).should.equal(cdn + '/93e9084aa289b7f1f5e4ab6716a56c3b.json');
    gravatar.profile_url('emerleite@gmail.com', { cdn: cdn, format: 'xml' }).should.equal(cdn + '/93e9084aa289b7f1f5e4ab6716a56c3b.xml');
    gravatar.profile_url('emerleite@gmail.com', { cdn: cdn, format: 'qr' }).should.equal(cdn + '/93e9084aa289b7f1f5e4ab6716a56c3b.qr');
    gravatar.url({}, { cdn: cdn }, true).should.equal(cdn + '/avatar/' + unspecifiedHash);
    gravatar.url(3, { cdn: cdn }, true).should.equal(cdn + '/avatar/' + unspecifiedHash);
    gravatar.url(true, { cdn: cdn }, true).should.equal(cdn + '/avatar/' + unspecifiedHash);
  });
});

describe('CLI', function () {
  describe('general: ', function () {
    it('accepts an email argument with options and writes gravatar URL to STDOUT', function (done) {
      nixt()
        .run('./cli.js zeke@sikelianos.com -p https -s 500 -d retro')
        .stdout('Gravatar (avatar):\nhttps://gravatar.com/avatar/8f344b1c4bdcfc28bd848e97e94c3523?default=retro&size=500')
        .end(done);
    });
    it('outputs usage if -h arg is present', function (done) {
      nixt()
        .run('./cli.js -h')
        .stdout(/Usage/)
        .end(done);
    });
  });

  describe('avatar command: ', function () {
    it('accepts an email argument with options and writes gravatar URL to STDOUT', function (done) {
      nixt()
        .run('./cli.js avatar zeke@sikelianos.com -p https -s 500 -d retro')
        .stdout('Gravatar (avatar):\nhttps://gravatar.com/avatar/8f344b1c4bdcfc28bd848e97e94c3523?default=retro&size=500')
        .end(done);
    });
  });

  describe('profile command: ', function () {
    it('accepts an email argument with options and writes gravatar profile URL to STDOUT', function (done) {
      nixt()
        .run('./cli.js profile zeke@sikelianos.com -p https -c doSomething')
        .stdout('Gravatar (profile):\nhttps://gravatar.com/8f344b1c4bdcfc28bd848e97e94c3523.json?callback=doSomething')
        .end(done);
    });
  });
});
