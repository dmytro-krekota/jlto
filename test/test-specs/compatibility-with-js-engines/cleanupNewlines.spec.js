let assert = require('chai').assert;
let jlto = require('../../../');
let testUtils = require('../../test-utils/testUtils');

describe('Tests for cleanup new lines', () => {
  it('Should not clear new lines in string with double quotes [nunjucks] [twig]', () => {
    let template = '<div>{{ "\n123\n321\n" }}</div>';
    let optimizedTemplate = jlto.optimizeString(template);
    let expectedOptimizedTemplate = '<div>{{"\n123\n321\n"}}</div>';
    let expectedRenderedString = '<div>\n123\n321\n</div>';

    assert.equal(expectedOptimizedTemplate, optimizedTemplate);
    assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(template));
    assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate));
    assert.equal(expectedRenderedString, testUtils.twig.renderString(template));
    assert.equal(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate));
  });

  it('Should not clear new lines in strings with double quotes using concat (~) and options [nunjucks] [twig]', () => {
    let template = '<div>{{ "\n123\n321\n"~test~"\nabc\nabc\n" }}</div>';
    let optimizedTemplate = jlto.optimizeString(template);
    let options = {test: '---'};
    let expectedOptimizedTemplate = '<div>{{"\n123\n321\n"~test~"\nabc\nabc\n"}}</div>';
    let expectedRenderedString = '<div>\n123\n321\n---\nabc\nabc\n</div>';

    assert.equal(expectedOptimizedTemplate, optimizedTemplate);
    assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(template, options));
    assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate, options));
    assert.equal(expectedRenderedString, testUtils.twig.renderString(template, options));
    assert.equal(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate, options));
  });

  it('Should not clear some new lines in block "set" [nunjucks] [twig]', () => {
    let template = `{% \nset\n \nfoo\n = \n{'foo': "\nbar\n", 'bar': \n"\nfoo\n"}\n\n\n%}{{foo.bar}}{{foo.foo}}`;
    let optimizedTemplate = jlto.optimizeString(template);
    let expectedOptimizedTemplate = `{%set foo={'foo':"\nbar\n",'bar':"\nfoo\n"}%}{{foo.bar}}{{foo.foo}}`;
    let expectedRenderedString = `\nfoo\n\nbar\n`;

    assert.equal(expectedOptimizedTemplate, optimizedTemplate);
    assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(template));
    assert.equal(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate));
    assert.equal(expectedRenderedString, testUtils.twig.renderString(template));
    assert.equal(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate));
  });
});
