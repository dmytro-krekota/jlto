let assert = require('chai').assert;
let jlto = require('../../../');

describe('Tests for minifyHtml option', () => {

    it('Should minify simple html template', () => {
        let result = jlto.optimizeString(`
<span>        1              </span><span>2</span>      <span> {{ 3 }}      </span>
<div>
{% for user in users %}
    <div>{{ "*" ~ " " ~ user.name }}</div>
{% endfor %}
</div>
`,
        {
            minifyHtml: true
        });

        assert.equal('<span>1 </span><span>2</span> <span> {{3}} </span><div> {%for user in users%} <div>{{"*"~" "~user.name}}</div> {%endfor%} </div>', result);
    });

    it('Should minify html template with inline styles', () => {
        let result = jlto.optimizeString(`
    {% for item in items %}
    <tr style="color: {{  trColor   }}    ">
      <td>{{item.name}}</td>
      <td>{{item.description}}</td>
      <td>{{item.created_at}}<br />{{item.updated_at}}</td>
      <td>{{ "0" if item.status else "1" }}</td>
      <td class="text-right"><a href="{{item.id}}" style="font-size: {{ linkFontSize }}; color: {{ linkColor }}">编辑</a></td>
    </tr>
    {% endfor %}
     <tr style="color: {{ trColor }}">
        <td colspan="5">
            记录为空!
        </td>
    </tr>
`,
        {
            minifyHtml: true
        });

        assert.equal('{%for item in items%} <tr style="color: {{trColor}} "><td>{{item.name}}</td><td>{{item.description}}</td><td>{{item.created_at}}<br>{{item.updated_at}}</td><td>{{"0" if item.status else "1"}}</td><td class="text-right"><a href="{{item.id}}" style="font-size: {{linkFontSize}};color: {{linkColor}}">编辑</a></td></tr> {%endfor%} <tr style="color: {{trColor}}"><td colspan="5">记录为空!</td></tr>', result);
    });

});