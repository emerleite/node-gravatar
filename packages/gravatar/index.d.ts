declare namespace gravatar {
  interface ImageOptions {
    size?: string | number;
    default?: '404' | 'mp' | 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash' | 'blank';
    forcedefault?: 'y';
    rating?: 'g' | 'pg' | 'r' | 'x';
    s?: ImageOptions['size'];
    d?: ImageOptions['default'];
    f?: ImageOptions['forcedefault'];
    r?: ImageOptions['rating'];
  }

  interface Options extends ImageOptions {
    cdn?: string;
    protocol?: boolean | 'https' | 'http';
    format?: 'json' | 'xml' | 'php' | 'vcf' | 'qr';
  }
}

export declare function url(email: string, options?: gravatar.Options, protocol?: boolean): string;
export declare function profileUrl(email: string, options?: gravatar.Options, protocol?: boolean): string;
export declare const profile_url: typeof profileUrl;

declare const gravatar: {
  url: typeof url,
  profileUrl: typeof profileUrl,
  profile_url: typeof profile_url
};

export default gravatar;
