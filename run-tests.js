#!/usr/bin/env node
var reporter = require('nodeunit').reporters.nested;
reporter.run(['test']);
