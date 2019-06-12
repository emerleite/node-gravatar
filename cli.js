#!/usr/bin/env node

const gravatar = require('./lib/gravatar');
const emailValidator = require('email-validator');
const path = require('path');

const mainOpts = {
  size: {
    alias: 's',
    describe: 'size of the requested image. (1-2048)'
  },
  protocol: {
    alias: 'p',
    describe: 'specifies the protocol of the url',
    choices: ['http', 'https']
  },
  default: {
    alias: 'd',
    describe: 'default image when no profile image found. [choices: "404", "mm", "identicon", "monsterid", "wavatar", "retro", "blank", "an image url"]'
  }
};
const setUsage = function (yargs) {
  return yargs
    .options(mainOpts)
    .help('h')
    .alias('h', 'help')
    .alias('v', 'version')
    .version(() => path.join('gravatar version: ', require('./package').version))
    .describe('v', 'show version information')
    .epilogue(`Useful Links:
        \n- https://en.gravatar.com/site/implement/images/
        \n- https://en.gravatar.com/site/implement/profiles/
        \n- https://github.com/emerleite/node-gravatar`);
};

const yargs = setUsage(require('yargs'))
  .usage('Usage: $0 command somebody@example.com [options]')
  .command('avatar', 'avatar somebody@example.com  [options]', mainOpts)
  .command('profile', 'profile somebody@example.com  [options]', {
    format: {
      alias: 'f',
      describe: 'format of the requested profile url',
      choices: ['json', 'xml', 'qr', 'php', 'vcf']
    },
    callback: {
      alias: 'c',
      describe: 'name of a callback function when using json profile url eg. doSomething'
    }
  })
  .example('$0 somebody@example.com')
  .example('$0 avatar somebody@example.com')
  .example('$0 profile somebody@example.com');

const argv = yargs.argv;
const command = argv._[0];
const email = argv._[1];

const getOptions = function (argv) {
  const options = {};
  options.default = argv.d || argv.default;
  options.size = argv.s || argv.size;
  options.protocol = argv.p || argv.protocol;
  options.format = argv.f || argv.format;
  options.callback = argv.c || argv.callback;

  // prune options
  for (const prop in options) {
    if (options.hasOwnProperty(prop) && !options[prop]) {
      delete options[prop];
    }
  }
  return options;
};

function printAvatarUrl(email, options) {
  console.log('Gravatar (avatar):');
  return `${gravatar.url(email, options)}\n`;
}

function printAvatarProfile(email, options) {
  console.log('Gravatar (profile):');
  return `${gravatar.profile_url(email, options)}\n`;
}

const exec = function (argv) {
  const options = getOptions(argv);
  if (command === 'profile') return printAvatarProfile(email, options);
  if (command === 'avatar' && emailValidator.validate(email)) return printAvatarUrl(email, options);
  if (emailValidator.validate(command)) return printAvatarUrl(command, options);
  yargs.showHelp();
  return '';
};

process.stdout.write(exec(argv));
process.exit();
