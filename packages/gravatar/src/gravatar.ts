import * as crypto from 'crypto';
import { deprecate } from 'util';
import normalizeUrl from 'normalize-url';
import { Options } from '..';
import urlJoin from 'url-join';
import { URLSearchParams } from 'url';

const isBoolean = (arg: unknown): arg is boolean => typeof arg === 'boolean';
const isString = (arg: unknown): arg is string => typeof arg === 'string';
const isUndefined = (arg: unknown): arg is undefined => arg === undefined;
const md5 = (val: string): string => crypto.createHash('md5').update(val, 'utf8').digest('hex');

const baseUrl = '//gravatar.com';
const reHash = /^[0-9a-f]{32}$/;

function proto({ protocol }: Options = {}): boolean | undefined {
  if (isBoolean(protocol)) return protocol;
  if (protocol === 'https') return true;
  if (protocol === 'http') return false;
}

function getHash(email?: string): string {
  email = isString(email) ? email.trim().toLowerCase() : 'unspecified';
  if (reHash.test(email)) return email;
  return md5(email);
}

function getQuery(options: Options = {}): string {
  const {
    size, s = size,
    default: defimg, d = defimg,
    forceDefault, forcedefault = forceDefault, f = forcedefault,
    rating, r = rating,
    format,
    callback
  } = options;
  const entries = Object.entries({ s, d, f, r }).reduce((acc, [key, val]): [string, string][] => {
    if (isUndefined(val)) return acc;
    if (isBoolean(val)) val = val ? 'y' : 'n';
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
  let url = urlJoin(cdn || baseUrl, '/avatar');
  if (!cdn && isBoolean(protocol)) {
    url = normalizeUrl(url, { forceHttps: protocol });
  }
  const hash = getHash(email);
  const query = getQuery(options);
  return urlJoin(url, hash, query);
}

export function profileUrl(email: string, options: Options = {}, protocol = proto(options)): string {
  const { cdn, format = 'json' } = options;
  const url = cdn || normalizeUrl(baseUrl, { forceHttps: Boolean(protocol) });
  const hash = getHash(email);
  const query = getQuery(options);
  return urlJoin(url, `${hash}.${format}`, query);
}

/* eslint-disable-next-line @typescript-eslint/camelcase */
export const profile_url = deprecate(profileUrl, 'profile_url() is deprecated. Use profileUrl() instead.');

/* eslint-disable-next-line @typescript-eslint/camelcase */
export default { url, profileUrl, profile_url };
