interface ImageOptions {
  size?: string | number;
  default?: '404' | 'mp' | 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash' | 'blank' | string;
  forcedefault?: boolean | 'y' | 'n';
  forceDefault?: ImageOptions['forcedefault'];
  rating?: 'g' | 'pg' | 'r' | 'x';
  s?: ImageOptions['size'];
  d?: ImageOptions['default'];
  f?: ImageOptions['forcedefault'];
  r?: ImageOptions['rating'];
}

export interface Options extends ImageOptions {
  cdn?: string;
  protocol?: boolean | 'https' | 'http';
  format?: 'json' | 'xml' | 'php' | 'vcf' | 'qr';
  callback?: 'string';
}

export declare function url(email: string, options?: Options, protocol?: boolean): string;
export declare function profileUrl(email: string, options?: Options, protocol?: boolean): string;
/* eslint-disable-next-line @typescript-eslint/camelcase */
export declare const profile_url: typeof profileUrl;

declare const gravatar: {
  url: typeof url;
  profileUrl: typeof profileUrl;
  /* eslint-disable-next-line @typescript-eslint/camelcase */
  profile_url: typeof profile_url;
};

export default gravatar;
