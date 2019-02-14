let assert = require('chai').assert
let jlto = require('../../../')

describe('Tests for specialChars option', () => {
  it('Should clear extra spaces for concat operator "~"', () => {
    let result = jlto.optimizeString(`
<div>
{% for user in users %}
    <div>{{ "*" ~ " " ~ user.name }}</div>
{% endfor %}
</div>
`)

    assert.equal('\n<div>\n{%for user in users%}\n    <div>{{"*"~" "~user.name}}</div>\n{%endfor%}\n</div>\n', result)
  })
})
