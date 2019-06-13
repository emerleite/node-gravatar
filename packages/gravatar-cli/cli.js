#!/usr/bin/env node

'use strict';

const emailValidator = require('email-validator');
const gravatar = require('gravatar');
const pkg = require('./package.json');

const options = {
  s: {
    alias: 'size',
    describe: 'size of the requested image. (1-2048)'
  },
  p: {
    alias: 'protocol',
    describe: 'specifies the protocol of the url',
    choices: ['http', 'https']
  },
  d: {
    alias: 'default',
    describe: `default image when no profile image found.   [choices: "404",
      "mm", "identicon", "monsterid", "wavatar", "retro", "blank", "an image url"]`
  }
};

const profileOptions = {
  f: {
    alias: 'format',
    describe: 'format of the requested profile url',
    choices: ['json', 'xml', 'qr', 'php', 'vcf']
  },
  c: {
    alias: 'callback',
    describe: 'name of a callback function when using json profile url eg. doSomething'
  }
};

const footer = `Useful Links:
  - https://en.gravatar.com/site/implement/images/
  - https://en.gravatar.com/site/implement/profiles/
  - ${pkg.homepage}`;

const getOptions = argv => pick(argv, [
  ...Object.values(options).map(({ alias }) => alias),
  ...Object.values(profileOptions).map(({ alias }) => alias)
]);

const setUsage = function (yargs) {
  return yargs
    .options(options)
    .help('h')
    .alias('h', 'help')
    .alias('v', 'version')
    .version(`gravatar version: ${pkg.version}`)
    .describe('v', 'show version information')
    .epilogue(footer);
};

const yargs = setUsage(require('yargs'))
  .usage('Usage: $0 [command] <somebody@example.com> [options]')
  .command('avatar', 'avatar somebody@example.com  [options]', options)
  .command('profile', 'profile somebody@example.com  [options]', profileOptions)
  .example('$0 somebody@example.com')
  .example('$0 avatar somebody@example.com')
  .example('$0 profile somebody@example.com');

function printAvatarUrl(email, options) {
  console.log('Gravatar (avatar):\n%s', gravatar.url(email, options));
}

function printAvatarProfile(email, options) {
  console.log('Gravatar (profile):\n%s', gravatar.profileUrl(email, options));
}

function exec(argv) {
  const [ command, email ] = argv._;
  const options = getOptions(argv);
  if (command === 'profile') {
    return printAvatarProfile(email, options);
  }
  if (command === 'avatar' && emailValidator.validate(email)) {
    return printAvatarUrl(email, options);
  }
  if (emailValidator.validate(command)) {
    return printAvatarUrl(command, options);
  }
  yargs.showHelp();
  return '';
}

exec(yargs.argv);
process.exit();

function pick(obj, keys = []) {
  return keys.reduce((acc, key) => {
    if (!obj.hasOwnProperty(key) || !obj[key]) return acc;
    return Object.assign(acc, { [key]: obj[key] });
  }, {});
}