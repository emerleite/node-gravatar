#!/usr/bin/env node

var gravatar = require('./lib/gravatar')
var args = process.argv.slice(2)
var email = args[0]

if (!email) {
  console.log('\nUsage: gravatar somebody@example.com\n')
  process.exit()
}

process.stdout.write(
  gravatar.url(email, {size: '500', default: 'retro'}, true) + '\n'
)
