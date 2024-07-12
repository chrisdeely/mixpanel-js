/*
 * Test that basic SDK usage (init, track, etc) does not
 * blow up in non-browser (node.js) envs. These are not
 * tests of server-side tracking functionality (which is
 * currently not supported in the browser lib).
 */

import jsDomSetup from './jsdom-setup';

describe(`Module-based loader in Node env`, function() {
  let mixpanel;
  jsDomSetup({
    reImportModules: [`../../src/loaders/loader-module`],
    beforeCallback: function(modules) {
      mixpanel = modules[0];
    }
  });

  it(`supports init() with options`, function(done) {
    mixpanel.init(`test-token`, {
      debug: true,
      persistence: `localStorage`,
      api_host: `https://test.com`,
      loaded: function() {
        done();
      },
    });
  });

  it(`supports identify()`, function() {
    mixpanel.identify(`Pat`);
  });

  it(`supports track()`, function() {
    mixpanel.track(`Did stuff`);
  });
});
