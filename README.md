[![Build Status](https://secure.travis-ci.org/emerleite/node-gravatar.svg)](http://travis-ci.org/emerleite/node-gravatar)

# Node.js Gravatar library

A library to generate Gravatar URLs in Node.js
Based on gravatar specs - <https://en.gravatar.com/site/implement/hash/> and <https://en.gravatar.com/site/implement/images/>

## Dependencies

### Runtime

- Node `>=8`

### Development/Tests

- mocha
- should.js

## Installation

```sh
$ npm install gravatar
```

## Usage

```javascript
import gravatar from "gravatar";

gravatar.url(email);
gravatar.url(email, options);
gravatar.url(email, options, protocol);

gravatar.profileUrl(email);
gravatar.profileUrl(email, options);
gravatar.profileUrl(email, options, protocol);
```

## Parameters

- `email`:
  The gravatar email
- `options`:
  Query string options. Ex: `size` or `s`, `default` or `d`, `rating` or `r`, `forcedefault` or `f`.
  Additional options not passed as a query string:
  `protocol` (e.g. `"http"` or `"https"`) and `format` (only for `profileUrl`, e.g. `"xml"`, `"qr"`,
  by default it is `"json"`)
  Should be passed as an object. Ex: `{s: '200', f: 'y', d: '404'}`
- `protocol`
  Define if will use no protocol, http or https gravatar URL. Default is 'undefined', which generates URLs without protocol. True to force https and false to force http.
  It can also be set as `protocol` in `options` - see above.

### Examples

```javascript
import gravatar from "gravatar";

const email = "emerleite@gmail.com";

const url = gravatar.url(email, {
  size: 200,
  rating: "pg",
  default: "404"
});
//=> //gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?size=200&rating=pg&default=404

const unsecureUrl = gravatar.url(email, {
  size: 100,
  rating: "x",
  default: "retro"
}, false /* [protocol="http"] */);
//=> http://gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?size=100&rating=x&default=retro

const secureUrl = gravatar.url(email, {
  size: 100,
  rating: "x",
  default: "retro"
}, true /* [protocol="https"] */);
//=> https://gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?size=100&rating=x&default=retro

const httpUrl = gravatar.url(email, {
  protocol: "http",
  size: 100
});
//=> http://gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?size=100

const httpsUrl = gravatar.url(email, {
  protocol: "https",
  size: 100
});
//=> https://gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?size=100

const profile1 = gravatar.profileUrl(email, {
  protocol: "https"
});
//=> https://secure.gravatar.com/93e9084aa289b7f1f5e4ab6716a56c3b.json

const profile2 = gravatar.profileUrl(email, {
  protocol: "http",
  format: "qr"
});
//=> http://gravatar.com/93e9084aa289b7f1f5e4ab6716a56c3b.qr
```

## CLI Usage

`gravatar` includes a simple command line interface. To use it, install globally:

```sh
npm i -g gravatar-cli

gravatar -h
gravatar somebody@example.com

gravatar avatar -h
gravatar avatar somebody@example.com

gravatar profile -h
gravatar profile somebody@example.com
```

## Running tests

```sh
$ yarn workspaces run test
```

## To-Do

- see (<https://github.com/emerleite/node-gravatar/issues>)

## Author

- Emerson Macedo (<http://emerleite.com/>)

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
