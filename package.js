Package.describe({
  name: 'peerlibrary:reactive-field',
  summary: "Reactive field for Meteor",
  version: '0.6.0',
  git: 'https://github.com/peerlibrary/meteor-reactive-field.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.8.1');

  // Core dependencies.
  api.use([
    'ecmascript',
    'tracker',
    'reactive-var',
    'underscore'
  ]);

  api.export('ReactiveField');

  api.mainModule('lib.js');
});

Package.onTest(function (api) {
  api.versionsFrom('METEOR@1.8.1');

  // Core dependencies.
  api.use([
    'coffeescript@2.4.1',
    'ecmascript',
    'tracker',
    'templating@1.3.2',
    'blaze@2.3.3',
    'spacebars@1.0.15',
    'underscore'
  ]);

  // Internal dependencies.
  api.use([
    'peerlibrary:reactive-field'
  ]);

  // 3rd party dependencies.
  api.use([
    'peerlibrary:classy-test@0.4.0'
  ]);

  api.addFiles([
    'tests.coffee'
  ]);

  api.addFiles([
    'tests_client.html',
    'tests_client.coffee'
  ], 'client');
});
