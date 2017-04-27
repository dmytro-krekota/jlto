let assert = require('chai').assert;
let utils = require('../../lib/core/utils');

describe('Tests for core utils', () => {

    it('Should check variables for null', () => {
        let a = 1;
        let b = 0;
        let c = undefined;
        let d = null;

        assert.equal(false, utils.isNull(a));
        assert.equal(false, utils.isNull(b));
        assert.equal(false, utils.isNull(c));
        assert.equal(true, utils.isNull(d));
    });

    it('Should check variables for undefined', () => {
        let a = 1;
        let b = 0;
        let c = undefined;
        let d = null;

        assert.equal(false, utils.isUndefined(a));
        assert.equal(false, utils.isUndefined(b));
        assert.equal(true, utils.isUndefined(c));
        assert.equal(false, utils.isUndefined(d));
    });

});