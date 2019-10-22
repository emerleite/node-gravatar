'use strict';

/* eslint-env mocha */

require('should');
const nixt = require('nixt');

describe('gravatar CLI', function () {
  describe('general: ', function () {
    it('accepts an email argument with options and writes gravatar URL to STDOUT', function (done) {
      nixt()
        .run('./cli.js zeke@sikelianos.com -p https -s 500 -d retro')
        .stdout('Gravatar (avatar):\nhttps://gravatar.com/avatar/8f344b1c4bdcfc28bd848e97e94c3523?s=500&d=retro')
        .end(done);
    });
    it('outputs usage if -h arg is present', function (done) {
      nixt()
        .run('./cli.js -h')
        .stdout(/Usage/)
        .end(done);
    });
  });

  describe('avatar command: ', function () {
    it('accepts an email argument with options and writes gravatar URL to STDOUT', function (done) {
      nixt()
        .run('./cli.js avatar zeke@sikelianos.com -p https -s 500 -d retro')
        .stdout('Gravatar (avatar):\nhttps://gravatar.com/avatar/8f344b1c4bdcfc28bd848e97e94c3523?s=500&d=retro')
        .end(done);
    });
  });

  describe('profile command: ', function () {
    it('accepts an email argument with options and writes gravatar profile URL to STDOUT', function (done) {
      nixt()
        .run('./cli.js profile zeke@sikelianos.com -p https -c doSomething')
        .stdout('Gravatar (profile):\nhttps://gravatar.com/8f344b1c4bdcfc28bd848e97e94c3523.json?callback=doSomething')
        .end(done);
    });
  });
});
