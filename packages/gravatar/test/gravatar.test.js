'use strict';

/* eslint-env mocha */

require('should');
// eslint-disable-next-line camelcase
const { url: gravatarUrl, profile_url } = require('..');
const { URL } = require('url');
const normalizeUrl = require('normalize-url');
const urlJoin = require('url-join');

const parseUrl = url => new URL(normalizeUrl(url));

describe('gravatar', () => {
  const baseUrl = '//gravatar.com';
  const unsecureUrl = 'http://gravatar.com/';
  const secureUrl = 'https://gravatar.com/';
  const unspecifiedHash = 'd415f0e30c471dfdd9bc4f827329ef48';

  it('should gererate correct uri given an email', () => {
    gravatarUrl('emerleite@gmail.com')
      .should.equal(urlJoin(baseUrl, '/avatar/93e9084aa289b7f1f5e4ab6716a56c3b'));
    gravatarUrl('emerleite@yahoo.com.br')
      .should.equal(urlJoin(baseUrl, '/avatar/6c47672b0d58bd6aae4fa70920cb3ee4'));
    gravatarUrl('93E9084AA289B7F1F5E4AB6716A56C3B@gmail.com')
      .should.equal(urlJoin(baseUrl, '/avatar/45503aaa7bc259c0ef5bba9997b77875'));
  });

  it('should generate same uri ignoring case', () => {
    gravatarUrl('EMERLEITE@gmAil.com')
      .should.equal(urlJoin(baseUrl, '/avatar/93e9084aa289b7f1f5e4ab6716a56c3b'));
    gravatarUrl('emerleite@YAHOO.com.BR')
      .should.equal(urlJoin(baseUrl, '/avatar/6c47672b0d58bd6aae4fa70920cb3ee4'));
  });

  it('should detect MD5 hashes and not hash them again', () => {
    gravatarUrl('93e9084aa289b7f1f5e4ab6716a56c3b')
      .should.equal(urlJoin(baseUrl, '/avatar/93e9084aa289b7f1f5e4ab6716a56c3b'));
    gravatarUrl('93E9084AA289B7F1F5E4AB6716A56C3B')
      .should.equal(urlJoin(baseUrl, '/avatar/93e9084aa289b7f1f5e4ab6716a56c3b'));
  });

  it('should generate uri with user passed parameters', () => {
    /** @type {import('..').default.Options} */
    const options = {
      size: 200,
      forceDefault: true,
      rating: 'g',
      default: '404'
    };
    const url = gravatarUrl('emerleite@gmail.com', options);
    const { searchParams } = parseUrl(url);
    searchParams.get('s').should.equal('200');
    searchParams.get('f').should.equal('y');
    searchParams.get('r').should.equal('g');
    searchParams.get('d').should.equal('404');
  });

  it('should force http protocol on gravatar uri generation', () => {
    gravatarUrl('emerleite@gmail.com', {}, false)
      .should.equal(urlJoin(unsecureUrl, '/avatar/93e9084aa289b7f1f5e4ab6716a56c3b'));
    gravatarUrl('emerleite@yahoo.com.br', {}, false)
      .should.equal(urlJoin(unsecureUrl, '/avatar/6c47672b0d58bd6aae4fa70920cb3ee4'));
  });

  it('should force https protocol on gravatar uri generation', () => {
    gravatarUrl('emerleite@gmail.com', {}, true)
      .should.equal(urlJoin(secureUrl, '/avatar/93e9084aa289b7f1f5e4ab6716a56c3b'));
  });

  it('should handle falsey values for the email property', () => {
    /* eslint-disable no-unused-expressions */
    gravatarUrl(null).should.be.ok;
    gravatarUrl(undefined).should.be.ok;
    gravatarUrl('').should.be.ok;
    /* eslint-enable */
  });

  it('should handle non string values for the email property', () => {
    gravatarUrl({}, {}, true)
      .should.equal(urlJoin(secureUrl, '/avatar/', unspecifiedHash));
    gravatarUrl(3, {}, true)
      .should.equal(urlJoin(secureUrl, '/avatar/', unspecifiedHash));
    gravatarUrl(true, {}, true)
      .should.equal(urlJoin(secureUrl, '/avatar/', unspecifiedHash));
  });

  it('should generate profile url', () => {
    profile_url('emerleite@gmail.com', {}, true)
      .should.equal(urlJoin(secureUrl, '93e9084aa289b7f1f5e4ab6716a56c3b.json'));
    profile_url('emerleite@gmail.com', { format: 'xml' }, true)
      .should.equal(urlJoin(secureUrl, '93e9084aa289b7f1f5e4ab6716a56c3b.xml'));
    profile_url('emerleite@gmail.com', { format: 'qr' }, true)
      .should.equal(urlJoin(secureUrl, '93e9084aa289b7f1f5e4ab6716a56c3b.qr'));
    profile_url('emerleite@gmail.com')
      .should.equal(urlJoin(unsecureUrl, '93e9084aa289b7f1f5e4ab6716a56c3b.json'));
  });

  it('should generate unspecified profile url when email is null', () => {
    profile_url(null, {}, true)
      .should.equal(urlJoin(secureUrl, `${unspecifiedHash}.json`));
    profile_url(undefined, {}, true)
      .should.equal(urlJoin(secureUrl, `${unspecifiedHash}.json`));
  });

  it('should force http protocol on gravatar uri generation via options', () => {
    gravatarUrl('emerleite@gmail.com', { protocol: 'http' })
      .should.equal(urlJoin(unsecureUrl, '/avatar/93e9084aa289b7f1f5e4ab6716a56c3b'));
    gravatarUrl('emerleite@yahoo.com.br', { protocol: 'http' })
      .should.equal(urlJoin(unsecureUrl, '/avatar/6c47672b0d58bd6aae4fa70920cb3ee4'));
  });

  it('should force https protocol on gravatar uri generation via options', () => {
    gravatarUrl('emerleite@gmail.com', { protocol: 'https' })
      .should.equal(urlJoin(secureUrl, '/avatar/93e9084aa289b7f1f5e4ab6716a56c3b'));
  });

  it('should generate uri with user passed parameters and protocol in options', () => {
    /** @type {import('..').default} */
    const options = {
      protocol: 'https',
      size: 200,
      forcedefault: 'y',
      rating: 'g',
      default: '404'
    };
    const url = gravatarUrl('emerleite@gmail.com', options);
    const { searchParams } = parseUrl(url);
    searchParams.get('s').should.equal('200');
    searchParams.get('f').should.equal('y');
    searchParams.get('r').should.equal('g');
    searchParams.get('d').should.equal('404');
  });

  it('should generate profile url with protocol in options', () => {
    profile_url('emerleite@gmail.com', { protocol: 'https' })
      .should.equal(urlJoin(secureUrl, '93e9084aa289b7f1f5e4ab6716a56c3b.json'));
    profile_url('emerleite@gmail.com', { protocol: 'https', format: 'xml' })
      .should.equal(urlJoin(secureUrl, '93e9084aa289b7f1f5e4ab6716a56c3b.xml'));
    profile_url('emerleite@gmail.com', { protocol: 'http', format: 'qr' })
      .should.equal(urlJoin(unsecureUrl, '93e9084aa289b7f1f5e4ab6716a56c3b.qr'));
    profile_url('emerleite@gmail.com')
      .should.equal(urlJoin(unsecureUrl, '93e9084aa289b7f1f5e4ab6716a56c3b.json'));
  });

  it('should generate profile url with cdn in options', () => {
    const cdn = 'http://cdn-gravatar.wuweixing.com';
    profile_url('emerleite@gmail.com', { cdn: cdn })
      .should.equal(urlJoin(cdn, '/93e9084aa289b7f1f5e4ab6716a56c3b.json'));
    profile_url('emerleite@gmail.com', { cdn: cdn, format: 'xml' })
      .should.equal(urlJoin(cdn, '/93e9084aa289b7f1f5e4ab6716a56c3b.xml'));
    profile_url('emerleite@gmail.com', { cdn: cdn, format: 'qr' })
      .should.equal(urlJoin(cdn, '/93e9084aa289b7f1f5e4ab6716a56c3b.qr'));
    gravatarUrl({}, { cdn: cdn }, true)
      .should.equal(urlJoin(cdn, '/avatar/', unspecifiedHash));
    gravatarUrl(3, { cdn: cdn }, true)
      .should.equal(urlJoin(cdn, '/avatar/', unspecifiedHash));
    gravatarUrl(true, { cdn: cdn }, true)
      .should.equal(urlJoin(cdn, '/avatar/', unspecifiedHash));
  });
});
