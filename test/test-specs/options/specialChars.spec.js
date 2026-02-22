let assert = require('assert');
let jlto = require('../../../');

describe('Tests for specialChars option', () => {
  it('Should clear extra spaces for concat operator "~"', async () => {
    let result = await jlto.optimizeString(`
<div>
{% for user in users %}
    <div>{{ "*" ~ " " ~ user.name }}</div>
{% endfor %}
</div>
`);

    assert.strictEqual(
      '\n<div>\n{%for user in users%}\n    <div>{{"*"~" "~user.name}}</div>\n{%endfor%}\n</div>\n',
      result,
    );
  });
});
