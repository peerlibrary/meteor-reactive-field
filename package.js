Package.describe({
  name: 'peerlibrary:reactive-field',
  summary: "Reactive field for Meteor",
  version: '0.1.0',
  git: 'https://github.com/peerlibrary/meteor-reactive-field.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0.3.1');

  // Core dependencies.
  api.use([
    'coffeescript',
    'tracker',
    'reactive-var'
  ]);

  api.export('ReactiveField');

  api.addFiles([
    'lib.coffee'
  ]);
});

Package.onTest(function (api) {
  // Core dependencies.
  api.use([
    'coffeescript',
    'tracker',
    'templating',
    'blaze',
    'spacebars'
  ]);

  // Internal dependencies.
  api.use([
    'peerlibrary:reactive-field'
  ]);

  // 3rd party dependencies.
  api.use([
    'peerlibrary:classy-test@0.2.15'
  ]);

  api.addFiles([
    'tests.coffee'
  ]);

  api.addFiles([
    'tests_client.html',
    'tests_client.coffee'
  ], 'client');
});
