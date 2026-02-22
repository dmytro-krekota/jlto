let assert = require('assert');
let utils = require('../../../lib/core/utils');

describe('Tests for core utils', () => {
  it('Should check variables for null', () => {
    let a = 1;
    let b = 0;
    let c = undefined;
    let d = null;

    assert.strictEqual(false, utils.isNull(a));
    assert.strictEqual(false, utils.isNull(b));
    assert.strictEqual(false, utils.isNull(c));
    assert.strictEqual(true, utils.isNull(d));
  });

  it('Should check variables for undefined', () => {
    let a = 1;
    let b = 0;
    let c = undefined;
    let d = null;

    assert.strictEqual(false, utils.isUndefined(a));
    assert.strictEqual(false, utils.isUndefined(b));
    assert.strictEqual(true, utils.isUndefined(c));
    assert.strictEqual(false, utils.isUndefined(d));
  });
});
