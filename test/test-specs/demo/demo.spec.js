let assert = require('chai').assert;
let jlto = require('../../../');
let testUtils = require('../../test-utils/testUtils');

describe('Tests for demo examples', () => {

    it('Should not clear new lines in string with double quotes [nunjucks] [twig] [liquid]', (done) => {
        let template = `
{{ hello }}
{{   "<John   &   Paul> ?"     | escape   }}
{{ '2.7'   | round }}{%  if  product  %}Product exists.{%  endif  %}`;
        let optimizedTemplate = jlto.optimizeString(template);
        let expectedOptimizedTemplate = `
{{hello}}
{{"<John   &   Paul> ?"|escape}}
{{'2.7'|round}}{%if product%}Product exists.{%endif%}`;
        let expectedRenderedString = '\n\n&lt;John   &amp;   Paul&gt; ?\n3';

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

    it('Should minify html for demo example', () => {
        let template = `
<div {% if id %}id="{{ id | escape('html_attr') }}"{% endif %} class="section-container {{ classes | join(' ') | html_attribute }}">
    <div class="section-writables">
        {% for writable in writables  %}
            {{ writable | write | raw }}
        {% endfor %}
    </div>
</div>`;
        let optimizedTemplate = jlto.optimizeString(template, {minifyHtml: true});
        let expectedOptimizedTemplate = `<div {%if id%} id="{{id|escape('html_attr')}}" {%endif%} class="section-container {{classes|join(' ')|html_attribute}}"><div class="section-writables"> {%for writable in writables%} {{writable|write|raw}} {%endfor%} </div></div>`;

        assert.equal(expectedOptimizedTemplate, optimizedTemplate);
    });

});