let cleanupTemplate = `
{{ hello }}
{{   "<John   &   Paul> ?"     | escape   }}
{{ '2.7'   | round }}{%  if  product  %}Product exists.{%  endif  %}`;

let cleanupOptimizedTemplate = `
{{hello}}
{{"<John   &   Paul> ?"|escape}}
{{'2.7'|round}}{%if product%}Product exists.{%endif%}`;

let cleanupRenderedString = '\n\n&lt;John   &amp;   Paul&gt; ?\n3';

let minifyHtmlTemplate = `
<div {% if id %}id="{{ id | escape('html_attr') }}"{% endif %} class="section-container {{ classes | join(' ') | html_attribute }}">
  <div class="section-writables">
    {% for writable in writables  %}
      {{ writable | write | raw }}
    {% endfor %}
  </div>
</div>`;

let minifyHtmlOptimizedTemplate = `<div {%if id%} id="{{id|escape('html_attr')}}" {%endif%} class="section-container {{classes|join(' ')|html_attribute}}"><div class="section-writables"> {%for writable in writables%} {{writable|write|raw}} {%endfor%} </div></div>`;

module.exports = {
  cleanupOptimizedTemplate,
  cleanupRenderedString,
  cleanupTemplate,
  minifyHtmlOptimizedTemplate,
  minifyHtmlTemplate,
};
