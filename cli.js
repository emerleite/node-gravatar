#!/usr/bin/env node

var gravatar = require('./lib/gravatar')
var emailValidator = require("email-validator")
var mainOpts = {
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
var setUsage = function(yargs){
  return yargs
      .options(mainOpts)
      .help('h')
      .alias('h', 'help')
      .alias('v', 'version')
      .version(function() { return 'gravatar version: ' + require('./package').version; })
      .describe('v', 'show version information')
      .epilogue('Useful Links:' +
          '\n- https://en.gravatar.com/site/implement/images/' +
          '\n- https://en.gravatar.com/site/implement/profiles/'+
          '\n- https://github.com/emerleite/node-gravatar'
        )

};

var yargs = setUsage(require('yargs'))
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
    .example('$0 profile somebody@example.com')

var argv = yargs.argv;
var command = argv._[0];
var email = argv._[1];

var getOptions = function(argv){
  var options = {};
  options.default = argv.d || argv.default;
  options.size = argv.s || argv.size;
  options.protocol = argv.p || argv.protocol
  options.format = argv.f || argv.format
  options.callback = argv.c || argv.callback

  // prune options
  for (var prop in options) {
    if(options.hasOwnProperty(prop) && !options[prop]){
      delete options[prop];
    }
  }
  return options;
};

function printAvatarUrl(email, options){
  console.log('Gravatar (avatar):')
  return gravatar.url(email, options) + '\n'
}

var exec = function(argv){
  var options = getOptions(argv);
  if(command === 'profile'){
    console.log('Gravatar (profile):')
    return gravatar.profile_url(email, options) + '\n'
  }else if(command === 'avatar' && emailValidator.validate(email)){
    return printAvatarUrl(email, options)
  }else if(emailValidator.validate(command)){
    return printAvatarUrl(command, options)
  }else{
    yargs.showHelp();
    return '';
  }
}

process.stdout.write( exec(argv) )
process.exit()
