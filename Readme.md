[![Build Status](https://secure.travis-ci.org/emerleite/node-gravatar.png)](http://travis-ci.org/emerleite/node-gravatar)

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

Instalation
-----------
> npm install gravatar

Usage
------
    var gravatar = require('gravatar');
    gravatar.url(email, options, https=false);

## Where:
* email:
  The gravatar email
* options:
  Query string options. Ex: size or s, default or d, rating or r, forcedefault or f.
  Should be passed as an object. Ex: {s: 200, f: 'y', d: '404'}
* https
  Define if will use secure gravatar. Default is false.

### Examples
    var gravatar = require('gravatar');
    var url = gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: '404'});
    //returns http://www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=200&r=pg&d=404
    var secureUrl = gravatar.url('emerleite@gmail.com', {s: '100', r: 'x', d: 'retro'}, true);
    //returns https://secure.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=100&r=x&d=retro

Running tests (3 ways)
----------------------
$ npm test
$ mocha (installed global)
$ node_modules/mocha/bin/mocha

To-Do
-----
* see (<https://github.com/emerleite/node-gravatar/issues>)

Author
------

* Emerson Macedo (<http://codificando.com/>)

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
