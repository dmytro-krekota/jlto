let assert = require('assert');
let jlto = require('../../../');

describe('Tests for removeComments option', () => {
  it('Should clear comments by default (removeComments is true)', async () => {
    let result = await jlto.optimizeString('<div>{# I am a comment. #}</div>');

    assert.strictEqual('<div></div>', result);
  });

  it('Should clear template with two comments', async () => {
    let result = await jlto.optimizeString('{# I am a comment 1. #}{# I am a comment 2. #}', {
      removeComments: true,
    });

    assert.strictEqual('', result);
  });

  it('Should not clear comments', async () => {
    let result = await jlto.optimizeString('{# I am a comment 1. #}{# I am a comment 2. #}', {
      removeComments: false,
    });

    assert.strictEqual('{# I am a comment 1. #}{# I am a comment 2. #}', result);
  });
});
