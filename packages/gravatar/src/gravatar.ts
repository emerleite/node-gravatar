import * as crypto from 'crypto';
import { deprecate } from 'util';
import normalizeUrl from 'normalize-url';
import { URLSearchParams } from 'url';

const isBoolean = (arg: any): arg is boolean => typeof arg === 'boolean';
const isString = (arg: any): arg is string => typeof arg === 'string';
const md5 = (val: string): string => crypto.createHash('md5').update(val, 'utf8').digest('hex');

const BASE_URL = '//gravatar.com';
const RE_MD5 = /^[0-9a-f]{32}$/;

interface ImageOptions {
  size?: string | number,
  default?: '404' | 'mp' | 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash' | 'blank',
  forcedefault?: 'y'
  rating?: 'g' | 'pg' | 'r' | 'x',
  s?: ImageOptions['size'],
  d?: ImageOptions['default'],
  f?: ImageOptions['forcedefault'],
  r?: ImageOptions['rating'],
}

interface Options extends ImageOptions {
  cdn?: string,
  protocol?: boolean | 'https' | 'http',
  format?: 'json' | 'xml' | 'php' | 'vcf' | 'qr'
}

function proto({ protocol }: Options = {}): boolean {
  if (isBoolean(protocol)) return protocol;
  if (protocol === 'https') return true;
  if (protocol === 'http') return false;
}

function getHash(email?: string): string {
  email = isString(email) ? email.trim().toLowerCase() : 'unspecified';
  if (RE_MD5.test(email)) return email;
  return md5(email);
}

function getQuery({ cdn, format, protocol, ...options }: Options = {}) {
  const entries = Object.entries(options);
  if (!entries.length) return '';
  const searchParams = new URLSearchParams(entries);
  return `?${searchParams}`;
}

export function url(email: string, options: Options = {}, protocol = proto(options)): string {
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

export function profileUrl(email: string, options: Options = {}, protocol = proto(options)): string {
  const { cdn, format = 'json' } = options;
  let url = '';
  if (cdn) {
    url = `${cdn}`;
  } else {
    url = normalizeUrl(BASE_URL, { forceHttps: Boolean(protocol) });
  }
  const hash = getHash(email);
  const query = getQuery(options);
  return `${url}/${hash}.${format}${query}`;
}

export const profile_url = deprecate(profileUrl, 'profile_url() is deprecated. Use profileUrl() instead.');

export default { url, profileUrl, profile_url };
