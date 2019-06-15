import * as crypto from 'crypto';
import { deprecate } from 'util';
import normalizeUrl from 'normalize-url';
import urlJoin from 'url-join';
import { URLSearchParams } from 'url';

const isBoolean = (arg: any): arg is boolean => typeof arg === 'boolean';
const isString = (arg: any): arg is string => typeof arg === 'string';
const isUndefined = (arg: any): arg is undefined => arg === void 0;
const md5 = (val: string): string => crypto.createHash('md5').update(val, 'utf8').digest('hex');

const baseUrl = '//gravatar.com';
const reHash = /^[0-9a-f]{32}$/;

interface ImageOptions {
  size?: string | number,
  default?: '404' | 'mp' | 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash' | 'blank' | string,
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
  callback?: string
}

function proto({ protocol }: Options = {}): boolean {
  if (isBoolean(protocol)) return protocol;
  if (protocol === 'https') return true;
  if (protocol === 'http') return false;
}

function getHash(email?: string): string {
  email = isString(email) ? email.trim().toLowerCase() : 'unspecified';
  if (reHash.test(email)) return email;
  return md5(email);
}

function getQuery(options: Options = {}) {
  const {
    size, s = size,
    default: defimg, d = defimg,
    forcedefault, f = forcedefault,
    rating, r = rating,
    format,
    callback
  } = options;
  const entries = Object.entries({ s, d, f, r }).reduce((acc, [key, val]) => {
    if (isUndefined(val)) return acc;
    acc.push([key, val]);
    return acc;
  }, []);
  if (format === 'json' && !isUndefined(callback)) {
    entries.push(['callback', callback]);
  }
  if (!entries.length) return '';
  return `?${new URLSearchParams(entries)}`;
}

export function url(email: string, options: Options = {}, protocol = proto(options)): string {
  const { cdn } = options;
  let url;
  if (cdn) {
    url = urlJoin(cdn, '/avatar');
  } else {
    url = urlJoin(baseUrl, '/avatar');
    if (isBoolean(protocol)) {
      url = normalizeUrl(url, { forceHttps: protocol });
    }
  }
  const hash = getHash(email);
  const query = getQuery(options);
  return urlJoin(url, hash, query);
}

export function profileUrl(email: string, options: Options = {}, protocol = proto(options)): string {
  const { cdn, format = 'json' } = options;
  let url = '';
  if (cdn) {
    url = `${cdn}`;
  } else {
    url = normalizeUrl(baseUrl, { forceHttps: Boolean(protocol) });
  }
  const hash = getHash(email);
  const query = getQuery(options);
  return urlJoin(url, `${hash}.${format}`, query);
}

export const profile_url = deprecate(profileUrl, 'profile_url() is deprecated. Use profileUrl() instead.');

export default { url, profileUrl, profile_url };
