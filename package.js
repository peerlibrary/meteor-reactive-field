Package.describe({
  name: 'peerlibrary:reactive-field',
  summary: "Reactive field for Meteor",
  version: '0.4.0',
  git: 'https://github.com/peerlibrary/meteor-reactive-field.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.4.4.5');

  // Core dependencies.
  api.use([
    'coffeescript@2.0.3_3',
    'ecmascript',
    'tracker',
    'reactive-var',
    'underscore'
  ]);

  api.export('ReactiveField');

  api.mainModule('lib.coffee');
});

Package.onTest(function (api) {
  api.versionsFrom('METEOR@1.4.4.5');

  // Core dependencies.
  api.use([
    'coffeescript@2.0.3_3',
    'ecmascript',
    'tracker',
    'templating',
    'blaze',
    'spacebars',
    'underscore'
  ]);

  // Internal dependencies.
  api.use([
    'peerlibrary:reactive-field'
  ]);

  // 3rd party dependencies.
  api.use([
    'peerlibrary:classy-test@0.3.0'
  ]);

  api.addFiles([
    'tests.coffee'
  ]);

  api.addFiles([
    'tests_client.html',
    'tests_client.coffee'
  ], 'client');
});
