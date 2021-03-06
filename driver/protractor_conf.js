/**
 * Copyright 2018 Aarhus University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var argv = require('yargs')
  .usage('Usage: protractor protractor_conf.js --output-dir <directory> --url <url> [--headless] --disableChecks')
  .option('headless', { demand: true, type: 'boolean' })
  .option('output-dir', { demand: true, type: 'string' })
  .option('port', { default: '8081', type: 'string' })
  .option('screenshot', { default: true, type: 'boolean' })
  .option('url', { demand: true, type: 'string' })
  .argv;

var chromeArgs = [
  '--disable-application-cache',
  '--proxy-server=127.0.0.1:' + argv.port,
  '--proxy-bypass-list=',
  '--window-size=1600,900'];

if (argv.headless) {
  chromeArgs.push('--headless');
}

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: chromeArgs
    }
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 5 * 60 * 1000,
    print: function() { /* ignore stack trace */ }
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['spec.js'],

  params: argv
};
