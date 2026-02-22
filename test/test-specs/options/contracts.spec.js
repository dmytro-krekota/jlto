let assert = require('assert');
let jlto = require('../../../');

describe('Tests for API contracts and options behavior', () => {
  it('Should always return Promise when minifyHtml is disabled', async () => {
    let resultPromise = jlto.optimizeString('<div>{{ text }}</div>', {minifyHtml: false});

    assert.strictEqual(typeof resultPromise?.then, 'function');
    assert.strictEqual('<div>{{text}}</div>', await resultPromise);
  });

  it('Should always return Promise when minifyHtml is enabled', async () => {
    let resultPromise = jlto.optimizeString('<div>{{ text }}</div>', {minifyHtml: true});
    let result = await resultPromise;

    assert.strictEqual(typeof resultPromise?.then, 'function');
    assert.strictEqual('string', typeof result);
  });

  it('Should remove comments with custom comment delimiters', async () => {
    let result = await jlto.optimizeString('A{* test comment *}B', {
      commentStart: '{*',
      commentEnd: '*}',
      removeComments: true,
    });

    assert.strictEqual('AB', result);
  });

  it('Should merge minifyHtmlOptions and not mutate incoming options', async () => {
    let options = {
      minifyHtml: true,
      minifyHtmlOptions: {
        removeComments: false,
      },
    };
    let optionsCopy = JSON.parse(JSON.stringify(options));
    let result = await jlto.optimizeString('<div> {{ value }} </div><!--keep-->', options);

    assert.ok(result.includes('{{value}}'));
    assert.ok(result.includes('<!--keep-->'));
    assert.deepStrictEqual(options, optionsCopy);
  });
});
