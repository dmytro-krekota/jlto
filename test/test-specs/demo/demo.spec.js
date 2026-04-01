let assert = require('node:assert');
let jlto = require('../../../');
let demoFixtures = require('../../test-utils/demoFixtures');
let testUtils = require('../../test-utils/testUtils');

describe('Tests for demo examples', () => {
  it('Should not clear new lines in string with double quotes [nunjucks] [twig] [liquid]', async () => {
    let optimizedTemplate = await jlto.optimizeString(demoFixtures.cleanupTemplate);

    assert.strictEqual(demoFixtures.cleanupOptimizedTemplate, optimizedTemplate);
    assert.strictEqual(
      demoFixtures.cleanupRenderedString,
      testUtils.nunjucks.renderString(demoFixtures.cleanupTemplate),
    );
    assert.strictEqual(demoFixtures.cleanupRenderedString, testUtils.nunjucks.renderString(optimizedTemplate));
    assert.strictEqual(demoFixtures.cleanupRenderedString, testUtils.twig.renderString(demoFixtures.cleanupTemplate));
    assert.strictEqual(demoFixtures.cleanupRenderedString, testUtils.twig.renderString(optimizedTemplate));
    let result1 = await testUtils.liquid.renderString(demoFixtures.cleanupTemplate);
    let result2 = await testUtils.liquid.renderString(optimizedTemplate);

    assert.strictEqual(demoFixtures.cleanupRenderedString, result1);
    assert.strictEqual(demoFixtures.cleanupRenderedString, result2);
  });

  it('Should minify html for demo example', async () => {
    let optimizedTemplate = await jlto.optimizeString(demoFixtures.minifyHtmlTemplate, {
      minifyHtml: true,
    });

    assert.strictEqual(demoFixtures.minifyHtmlOptimizedTemplate, optimizedTemplate);
  });
});
