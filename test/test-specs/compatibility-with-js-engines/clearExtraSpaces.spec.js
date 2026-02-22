let assert = require('assert');
let jlto = require('../../../');
let testUtils = require('../../test-utils/testUtils');

describe('Tests for clearing extra spaces', () => {
  it('Should clear extra spaces in 2 expressions [liquid]', async () => {
    let template = '<div>{{ hi }} {{   name   }}!</div>';
    let optimizedTemplate = await jlto.optimizeString(template);
    let options = {hi: 'Hello', name: 'Liquid'};
    let expectedOptimizedTemplate = '<div>{{hi}} {{name}}!</div>';
    let expectedRenderedString = '<div>Hello Liquid!</div>';

    let result1 = await testUtils.liquid.renderString(template, options);
    let result2 = await testUtils.liquid.renderString(optimizedTemplate, options);

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    assert.strictEqual(expectedRenderedString, result1);
    assert.strictEqual(expectedRenderedString, result2);
  });

  it('Should clear 6 extra spaces for "escape" filter [nunjucks] [twig] [liquid]', async () => {
    let template = `{{   "<John   &   Paul> ?"     | escape   }}`;
    let optimizedTemplate = await jlto.optimizeString(template);
    let expectedOptimizedTemplate = `{{"<John   &   Paul> ?"|escape}}`;
    let expectedRenderedString = `&lt;John   &amp;   Paul&gt; ?`;

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(template));
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(template));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate));
    let result1 = await testUtils.liquid.renderString(template);
    let result2 = await testUtils.liquid.renderString(optimizedTemplate);

    assert.strictEqual(expectedRenderedString, result1);
    assert.strictEqual(expectedRenderedString, result2);
  });

  it('Should clear 4 extra spaces for "round" filter [nunjucks] [twig] [liquid]', async () => {
    let template = `{{ '2.7'   | round }}`;
    let optimizedTemplate = await jlto.optimizeString(template);
    let expectedOptimizedTemplate = `{{'2.7'|round}}`;
    let expectedRenderedString = `3`;

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(template));
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(template));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate));
    let result1 = await testUtils.liquid.renderString(template);
    let result2 = await testUtils.liquid.renderString(optimizedTemplate);

    assert.strictEqual(expectedRenderedString, result1);
    assert.strictEqual(expectedRenderedString, result2);
  });

  it('Should clear extra spaces near some special chars [nunjucks] [twig]', async () => {
    let template = `{% if product.type == "Shirt" or product.type == "Shoes" %}This is a {{ product.type }} or a pair of shoes.{% endif %}`;
    let optimizedTemplate = await jlto.optimizeString(template);
    let options = {product: {type: 'Shirt'}};
    let expectedOptimizedTemplate = `{%if product.type=="Shirt" or product.type=="Shoes"%}This is a {{product.type}} or a pair of shoes.{%endif%}`;
    let expectedRenderedString = `This is a Shirt or a pair of shoes.`;

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(template, options));
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate, options));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(template, options));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate, options));
  });

  it('Should clear extra spaces for `round` and `default` filters [liquid]', async () => {
    let template = `hello : {{ 55.1    |    round}} ! {{ foo | default         : 'bar' }}`;
    let optimizedTemplate = await jlto.optimizeString(template);
    let expectedOptimizedTemplate = `hello : {{55.1|round}} ! {{foo|default:'bar'}}`;
    let expectedRenderedString = `hello : 55 ! bar`;

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    let result1 = await testUtils.liquid.renderString(template);
    let result2 = await testUtils.liquid.renderString(optimizedTemplate);

    assert.strictEqual(expectedRenderedString, result1);
    assert.strictEqual(expectedRenderedString, result2);
  });

  it('Should clear extra spaces for expression with concat operator "~" [nunjucks] [twig]', async () => {
    let template = `<div>{{ "1" ~  "2" ~   "3" ~    "4" ~     "5" }}</div>`;
    let optimizedTemplate = await jlto.optimizeString(template);
    let expectedOptimizedTemplate = `<div>{{"1"~"2"~"3"~"4"~"5"}}</div>`;
    let expectedRenderedString = `<div>12345</div>`;

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(template));
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(template));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate));
  });
});
