import crypto from 'crypto';
import { deprecate } from 'util';
import normalizeUrl from 'normalize-url';
import { URLSearchParams } from 'url';

const isBoolean = arg => typeof arg === 'boolean';
const isString = arg => typeof arg === 'string';
const md5 = val => crypto.createHash('md5').update(val, 'utf8').digest('hex');

const BASE_URL = '//gravatar.com';
const RE_MD5 = /^[0-9a-f]{32}$/;

function proto({ protocol } = {}) {
  if (isBoolean(protocol)) return protocol;
  if (protocol === 'https') return true;
  if (protocol === 'http') return false;
}

function getHash(email) {
  email = isString(email) ? email.trim().toLowerCase() : 'unspecified';
  if (RE_MD5.test(email)) return email;
  return md5(email);
}

function getQuery({ cdn, format, protocol, ...options } = {}) {
  const entries = Object.entries(options);
  if (!entries.length) return '';
  const searchParams = new URLSearchParams(entries);
  return `?${searchParams}`;
}

function url(email, options = {}, protocol = proto(options)) {
  const { cdn } = options;
  let url;
  if (cdn) {
    url = `${cdn}/avatar`;
  } else {
    url = `${BASE_URL}/avatar`;
    if (isBoolean(protocol)) {
      url = normalizeUrl(url, { forceHttps: protocol });
    }
  }
  const hash = getHash(email);
  const query = getQuery(options);
  return `${url}/${hash}${query}`;
}

function profileUrl(email, options = {}, protocol = proto(options)) {
  const { cdn, format = 'json' } = options;
  let url = '';
  if (cdn) {
    url = `${cdn}`;
  } else {
    url = normalizeUrl(BASE_URL, { forceHttps: protocol });
  }
  const hash = getHash(email);
  const query = getQuery(options);
  return `${url}/${hash}.${format}${query}`;
}

export default {
  url,
  profileUrl,
  profile_url: deprecate(profileUrl, 'profile_url() is deprecated. Use profileUrl() instead.')
};
