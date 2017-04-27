let assert = require('chai').assert;
let jlto = require('../../');
let testUtils = require('../test-utils/testUtils');


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

});