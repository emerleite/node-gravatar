[![Build Status](https://secure.travis-ci.org/emerleite/node-gravatar.svg)](http://travis-ci.org/emerleite/node-gravatar)

Node.js Gravatar library
========================
A library to generate Gravatar URLs in Node.js
Based on gravatar specs - <http://en.gravatar.com/site/implement/hash/> and <http://en.gravatar.com/site/implement/images/>

Dependencies
------------

### Runtime
* Node 0.8.X+

### Development/Tests
* mocha
* should.js

Installation
-----------
```sh
$ npm install gravatar
```

Usage
------

```javascript
var gravatar = require('gravatar');

gravatar.url(email);
gravatar.url(email, options);
gravatar.url(email, options, protocol);

gravatar.profile_url(email);
gravatar.profile_url(email, options);
gravatar.profile_url(email, options, protocol);
```

## Where:
* `email`:
  The gravatar email
* `options`:
  Query string options. Ex: `size` or `s`, `default` or `d`, `rating` or `r`, `forcedefault` or `f`.
  Additional options not passed as a query string:
  `protocol` (e.g. `"http"` or `"https"`) and `format` (only for `profile_url`, e.g. `"xml"`, `"qr"`,
  by default it is `"json"`)
  Should be passed as an object. Ex: `{s: '200', f: 'y', d: '404'}`
* `protocol`
  Define if will use no protocol, http or https gravatar URL. Default is 'undefined', which generates URLs without protocol. True to force https and false to force http.
  It can also be set as `protocol` in `options` - see above.

### Examples

```javascript
var gravatar = require('gravatar');

var url = gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: '404'});
//returns //www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=200&r=pg&d=404

var unsecureUrl = gravatar.url('emerleite@gmail.com', {s: '100', r: 'x', d: 'retro'}, false);
//returns http://www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=100&r=x&d=retro

var secureUrl = gravatar.url('emerleite@gmail.com', {s: '100', r: 'x', d: 'retro'}, true);
//returns https://s.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=100&r=x&d=retro

var httpUrl = gravatar.url('emerleite@gmail.com', {protocol: 'http', s: '100'});
//returns http://www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=100

var httpsUrl = gravatar.url('emerleite@gmail.com', {protocol: 'https', s: '100'});
//returns https://s.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=100

var profile1 = gravatar.profile_url('emerleite@gmail.com', {protocol: 'https'});
//returns https://secure.gravatar.com/93e9084aa289b7f1f5e4ab6716a56c3b.json

var profile2 = gravatar.profile_url('emerleite@gmail.com', {protocol: 'http', format:'qr'});
//returns http://www.gravatar.com/93e9084aa289b7f1f5e4ab6716a56c3b.qr
```

CLI Usage
---------

`gravatar` includes a simple command line interface. To use it, install globally:

```sh
npm i -g gravatar

gravatar -h
gravatar somebody@example.com

gravatar avatar -h
gravatar avatar somebody@example.com

gravatar profile -h
gravatar profile somebody@example.com

```


Running tests (3 ways)
----------------------
```sh
$ npm test
$ mocha (installed global)
$ node_modules/mocha/bin/mocha
```

To-Do
-----
* see (<https://github.com/emerleite/node-gravatar/issues>)

Author
------

* Emerson Macedo (<http://emerleite.com/>)

License:
--------

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
