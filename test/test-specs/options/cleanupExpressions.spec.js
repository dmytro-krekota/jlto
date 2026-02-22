let assert = require('assert');
let jlto = require('../../../');

describe('Tests for cleanupExpressions option', () => {
  it('Should trim extra spaces by default (cleanupExpressions is true)', async () => {
    let result = await jlto.optimizeString('<div>{{ text }}</div>');

    assert.strictEqual('<div>{{text}}</div>', result);
  });

  it('Should trim extra spaces in expression {{     text     }}', async () => {
    let result = await jlto.optimizeString('<div>{{     text     }}</div>', {
      cleanupExpressions: true,
    });

    assert.strictEqual('<div>{{text}}</div>', result);
  });

  it('Should trim extra spaces in three expressions', async () => {
    let result = await jlto.optimizeString('<div>{{ a1 }}</div><div>{{ a2 }}</div><div>{{ a3 }}</div>', {
      cleanupExpressions: true,
    });

    assert.strictEqual('<div>{{a1}}</div><div>{{a2}}</div><div>{{a3}}</div>', result);
  });

  it('Should trim extra spaces in template with custom expressions {{{ custom }}}', async () => {
    let result = await jlto.optimizeString(
      '<div>{{{ custom1 }}}</div><div>{{{  custom2  }}}{{{   custom3    }}}</div>',
      {
        cleanupExpressions: true,
        expressionStart: '{{{',
        expressionEnd: '}}}',
      },
    );

    assert.strictEqual('<div>{{{custom1}}}</div><div>{{{custom2}}}{{{custom3}}}</div>', result);
  });

  it('Should trim extra spaces in template with custom expressions [ custom ]', async () => {
    let result = await jlto.optimizeString('<span>[ custom1 ][  custom2  ][   custom3    ]</span>', {
      cleanupExpressions: true,
      expressionStart: '[',
      expressionEnd: ']',
    });

    assert.strictEqual('<span>[custom1][custom2][custom3]</span>', result);
  });

  it('Should trim extra spaces in template with custom expressions [== custom ]', async () => {
    let result = await jlto.optimizeString('<span>[== custom1 ][==  custom2  ][==   custom3    ]</span>', {
      cleanupExpressions: true,
      expressionStart: '[==',
      expressionEnd: ']',
    });

    assert.strictEqual('<span>[==custom1][==custom2][==custom3]</span>', result);
  });

  it('Should not clear extra spaces in template for expressions', async () => {
    let result = await jlto.optimizeString('{{ a1 }}{{  a2  }}{{   a3   }}', {
      cleanupExpressions: false,
    });

    assert.strictEqual('{{ a1 }}{{  a2  }}{{   a3   }}', result);
  });

  it('Should clear newlines for 3 expressions', async () => {
    let result = await jlto.optimizeString(
      `{{ a1
        }}{{ a2
        }}{{ a3
        }}`,
      {cleanupExpressions: true},
    );

    assert.strictEqual('{{a1}}{{a2}}{{a3}}', result);
  });

  it('Should clear extra newlines for 2 math expressions', async () => {
    let result = await jlto.optimizeString(
      `
{{1
+
2 }}{{ 3
-
4}}`,
      {cleanupExpressions: true},
    );

    assert.strictEqual('\n{{1+2}}{{3-4}}', result);
  });

  it('Should preserve spaces inside string with escaped quote', async () => {
    let result = await jlto.optimizeString('{{ "a\\" : b"   | escape }}', {
      cleanupExpressions: true,
    });

    assert.strictEqual('{{"a\\" : b"|escape}}', result);
  });
});
