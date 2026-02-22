let assert = require('assert');
let jlto = require('../../../');
let testUtils = require('../../test-utils/testUtils');

describe('Tests for demo examples', () => {
  it('Should not clear new lines in string with double quotes [nunjucks] [twig] [liquid]', async () => {
    let template = `
{{ hello }}
{{   "<John   &   Paul> ?"     | escape   }}
{{ '2.7'   | round }}{%  if  product  %}Product exists.{%  endif  %}`;
    let optimizedTemplate = await jlto.optimizeString(template);
    let expectedOptimizedTemplate = `
{{hello}}
{{"<John   &   Paul> ?"|escape}}
{{'2.7'|round}}{%if product%}Product exists.{%endif%}`;
    let expectedRenderedString = '\n\n&lt;John   &amp;   Paul&gt; ?\n3';

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

  it('Should minify html for demo example', async () => {
    let template = `
<div {% if id %}id="{{ id | escape('html_attr') }}"{% endif %} class="section-container {{ classes | join(' ') | html_attribute }}">
    <div class="section-writables">
        {% for writable in writables  %}
            {{ writable | write | raw }}
        {% endfor %}
    </div>
</div>`;
    let optimizedTemplate = await jlto.optimizeString(template, {
      minifyHtml: true,
    });
    let expectedOptimizedTemplate = `<div {%if id%} id="{{id|escape('html_attr')}}" {%endif%} class="section-container {{classes|join(' ')|html_attribute}}"><div class="section-writables"> {%for writable in writables%} {{writable|write|raw}} {%endfor%} </div></div>`;

    assert.strictEqual(expectedOptimizedTemplate, optimizedTemplate);
  });
});
