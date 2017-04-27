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
                assert.equal(expectedOptimizedTemplate, optimizedTemplate);
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
                assert.equal(expectedOptimizedTemplate, optimizedTemplate);
                assert.equal(expectedRenderedString, result1);
                assert.equal(expectedRenderedString, result2);
                done();
            });
        });
    });

    // TODO: some map - 'if' (first tag) require space after, 'or', 'and' spaces??
    // it('Should clear ... [nunjucks] [twig] [liquid]', (done) => {
    //     let template = `{% if product.type == "Shirt" or product.type == "Shoes" %}This is a {{ product.type }} or a pair of shoes.{% endif %}`;
    //     let optimizedTemplate = jlto.optimizeString(template);
    //     let options = {product: {type: 'Shirt'}};
    //     let expectedOptimizedTemplate = `{%ifproduct.type=="Shirt"orproduct.type=="Shoes"%}This is a {{product.type}} or a pair of shoes.{%endif%}`;
    //     let expectedRenderedString = `3`;
    //
    //     assert.equal(expectedOptimizedTemplate, optimizedTemplate);
    //     assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(template, options));
    //     assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate, options));
    //     assert.equal(expectedRenderedString, testUtils.twig.renderString(template, options));
    //     assert.equal(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate, options));
    //     testUtils.liquid.renderString(template, options).then((result1) => {
    //         testUtils.liquid.renderString(optimizedTemplate, options).then((result2) => {
    //             assert.equal(expectedOptimizedTemplate, optimizedTemplate);
    //             assert.equal(expectedRenderedString, result1);
    //             assert.equal(expectedRenderedString, result2);
    //             done();
    //         });
    //     });
    // });

});