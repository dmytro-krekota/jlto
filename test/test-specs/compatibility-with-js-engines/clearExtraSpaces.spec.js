let assert = require('chai').assert;
let jlto = require('../../../');
let testUtils = require('../../test-utils/testUtils');

describe('Tests for clearing extra spaces', () => {

    it('Should clear extra spaces in 2 expressions [liquid]', (done) => {
        let template = '<div>{{ hi }} {{   name   }}!</div>';
        let optimizedTemplate = jlto.optimizeString(template);
        let options = {hi: 'Hello', name: 'Liquid'};
        let expectedOptimizedTemplate = '<div>{{hi}} {{name}}!</div>';
        let expectedRenderedString = '<div>Hello Liquid!</div>';

        testUtils.liquid.renderString(template, options).then((result1) => {
            testUtils.liquid.renderString(optimizedTemplate, options).then((result2) => {
                assert.equal(expectedOptimizedTemplate, optimizedTemplate);
                assert.equal(expectedRenderedString, result1);
                assert.equal(expectedRenderedString, result2);
                done();
            });
        });
    });

    it('Should clear 6 extra spaces for "escape" filter [nunjucks] [twig] [liquid]', (done) => {
        let template = `{{   "<John   &   Paul> ?"     | escape   }}`;
        let optimizedTemplate = jlto.optimizeString(template);
        let expectedOptimizedTemplate = `{{"<John   &   Paul> ?"|escape}}`;
        let expectedRenderedString = `&lt;John   &amp;   Paul&gt; ?`;

        assert.equal(expectedOptimizedTemplate, optimizedTemplate);
        assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(template));
        assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate));
        assert.equal(expectedRenderedString, testUtils.twig.renderString(template));
        assert.equal(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate));
        testUtils.liquid.renderString(template).then((result1) => {
            testUtils.liquid.renderString(optimizedTemplate).then((result2) => {
                assert.equal(expectedRenderedString, result1);
                assert.equal(expectedRenderedString, result2);
                done();
            });
        });
    });

    it('Should clear 4 extra spaces for "round" filter [nunjucks] [twig] [liquid]', (done) => {
        let template = `{{ '2.7'   | round }}`;
        let optimizedTemplate = jlto.optimizeString(template);
        let expectedOptimizedTemplate = `{{'2.7'|round}}`;
        let expectedRenderedString = `3`;

        assert.equal(expectedOptimizedTemplate, optimizedTemplate);
        assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(template));
        assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate));
        assert.equal(expectedRenderedString, testUtils.twig.renderString(template));
        assert.equal(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate));
        testUtils.liquid.renderString(template).then((result1) => {
            testUtils.liquid.renderString(optimizedTemplate).then((result2) => {
                assert.equal(expectedRenderedString, result1);
                assert.equal(expectedRenderedString, result2);
                done();
            });
        });
    });

    it('Should clear extra spaces near some special chars [nunjucks] [twig]', () => {
        let template = `{% if product.type == "Shirt" or product.type == "Shoes" %}This is a {{ product.type }} or a pair of shoes.{% endif %}`;
        let optimizedTemplate = jlto.optimizeString(template);
        let options = {product: {type: 'Shirt'}};
        let expectedOptimizedTemplate = `{%if product.type=="Shirt" or product.type=="Shoes"%}This is a {{product.type}} or a pair of shoes.{%endif%}`;
        let expectedRenderedString = `This is a Shirt or a pair of shoes.`;

        assert.equal(expectedOptimizedTemplate, optimizedTemplate);
        assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(template, options));
        assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate, options));
        assert.equal(expectedRenderedString, testUtils.twig.renderString(template, options));
        assert.equal(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate, options));
    });

    it('Should clear extra spaces for `round` and `default` filters [liquid]', (done) => {
        let template = `hello : {{ 55.1    |    round}} ! {{ foo | default         : 'bar' }}`;
        let optimizedTemplate = jlto.optimizeString(template);
        let expectedOptimizedTemplate = `hello : {{55.1|round}} ! {{foo|default:'bar'}}`;
        let expectedRenderedString = `hello : 55 ! bar`;

        assert.equal(expectedOptimizedTemplate, optimizedTemplate);
        testUtils.liquid.renderString(template).then((result1) => {
            testUtils.liquid.renderString(optimizedTemplate).then((result2) => {
                assert.equal(expectedRenderedString, result1);
                assert.equal(expectedRenderedString, result2);
                done();
            });
        });
    });

    it('Should clear extra spaces for expression with concat operator "~" [nunjucks] [twig]', () => {
        let template = `<div>{{ "1" ~  "2" ~   "3" ~    "4" ~     "5" }}</div>`;
        let optimizedTemplate = jlto.optimizeString(template);
        let expectedOptimizedTemplate = `<div>{{"1"~"2"~"3"~"4"~"5"}}</div>`;
        let expectedRenderedString = `<div>12345</div>`;

        assert.equal(expectedOptimizedTemplate, optimizedTemplate);
        assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(template));
        assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate));
        assert.equal(expectedRenderedString, testUtils.twig.renderString(template));
        assert.equal(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate));
    });

});