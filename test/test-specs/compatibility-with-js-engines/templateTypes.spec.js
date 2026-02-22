let assert = require('assert');
let jlto = require('../../../');
let testUtils = require('../../test-utils/testUtils');

describe('Tests for additional template types', () => {
  it('Should keep behavior for inline-if expression [nunjucks]', async () => {
    let template = '{{ "A" if isAdmin else "B" }}';
    let optimizedTemplate = await jlto.optimizeString(template);
    let options = {isAdmin: false};
    let expectedOptimizedTemplate = '{{"A" if isAdmin else "B"}}';
    let expectedRenderedString = 'B';

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(template, options));
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate, options));
  });

  it('Should keep behavior for ternary expression [twig]', async () => {
    let template = '{{ isAdmin ? "A" : "B" }}';
    let optimizedTemplate = await jlto.optimizeString(template);
    let options = {isAdmin: false};
    let expectedOptimizedTemplate = '{{isAdmin ? "A":"B"}}';
    let expectedRenderedString = 'B';

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(template, options));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate, options));
  });

  it('Should keep behavior for array index access [nunjucks] [twig]', async () => {
    let template = '{{ users[ 1 ].name }}';
    let optimizedTemplate = await jlto.optimizeString(template);
    let options = {users: [{name: 'A'}, {name: 'B'}]};
    let expectedOptimizedTemplate = '{{users[1].name}}';
    let expectedRenderedString = 'B';

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(template, options));
    assert.strictEqual(expectedRenderedString, testUtils.nunjucks.renderString(optimizedTemplate, options));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(template, options));
    assert.strictEqual(expectedRenderedString, testUtils.twig.renderString(optimizedTemplate, options));
  });

  it('Should keep behavior for if/elsif/else blocks [liquid]', async () => {
    let template = '{% if points >= 90 %}A{% elsif points >= 80 %}B{% else %}C{% endif %}';
    let optimizedTemplate = await jlto.optimizeString(template);
    let options = {points: 85};
    let expectedOptimizedTemplate = '{%if points >=90%}A{%elsif points >=80%}B{%else%}C{%endif%}';
    let expectedRenderedString = 'B';

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    let result1 = await testUtils.liquid.renderString(template, options);
    let result2 = await testUtils.liquid.renderString(optimizedTemplate, options);

    assert.strictEqual(expectedRenderedString, result1);
    assert.strictEqual(expectedRenderedString, result2);
  });

  it('Should keep behavior for case/when blocks [liquid]', async () => {
    let template = '{% case role %}{% when "admin" %}A{% when "editor" %}E{% else %}U{% endcase %}';
    let optimizedTemplate = await jlto.optimizeString(template);
    let options = {role: 'editor'};
    let expectedOptimizedTemplate = '{%case role%}{%when "admin"%}A{%when "editor"%}E{%else%}U{%endcase%}';
    let expectedRenderedString = 'E';

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    let result1 = await testUtils.liquid.renderString(template, options);
    let result2 = await testUtils.liquid.renderString(optimizedTemplate, options);

    assert.strictEqual(expectedRenderedString, result1);
    assert.strictEqual(expectedRenderedString, result2);
  });

  it('Should keep behavior for capture blocks [liquid]', async () => {
    let template = '{% capture full_name %}{{ first }} {{ last }}{% endcapture %}{{ full_name }}';
    let optimizedTemplate = await jlto.optimizeString(template);
    let options = {first: 'John', last: 'Doe'};
    let expectedOptimizedTemplate = '{%capture full_name%}{{first}} {{last}}{%endcapture%}{{full_name}}';
    let expectedRenderedString = 'John Doe';

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
    let result1 = await testUtils.liquid.renderString(template, options);
    let result2 = await testUtils.liquid.renderString(optimizedTemplate, options);

    assert.strictEqual(expectedRenderedString, result1);
    assert.strictEqual(expectedRenderedString, result2);
  });
});
