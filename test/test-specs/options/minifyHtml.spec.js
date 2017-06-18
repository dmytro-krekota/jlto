let assert = require('chai').assert;
let jlto = require('../../../');

describe('Tests for minifyHtml option', () => {

    it('Should minify html with using ignoreCustomFragments', () => {
        let result = jlto.optimizeString(`
<span>        1              </span>     <span>{{ 2 }}      </span>
<div>
{% for user in users %}
    <div>{{ "*" ~ " " ~ user.name }}</div>
{% endfor %}
</div>
`,
            {
                minifyHtml: true,
                minifyHtmlOptions: {
                    ignoreCustomFragments: [/\{%[^}]+%\}/]
                }
            });

        assert.equal('<span>1 </span><span>{{2}}</span><div> {%for user in users%} <div>{{"*"~" "~user.name}}</div> {%endfor%} </div>', result);
    });

});