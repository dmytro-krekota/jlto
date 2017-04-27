/**
 * @class BlocksHelper
 */
class BlocksHelper {

    constructor(options) {
        this.options = options;
        this.utils = require('./../core/utils');
    }

    getBlockWithoutExtraSpaces(expression) {
        let body = expression.slice(this.options.blockStart.length).slice(0, -this.options.blockEnd.length);
        let resultBody = '';
        let i;
        let waitForChar;

        body = body.trim();
        for (i = 0; i < body.length; i++) {
            if (waitForChar && body[i] !== waitForChar) {
                resultBody += body[i];
                continue;
            }
            if (body[i] === '"' || body[i] === '\'') {
                if (!waitForChar) {
                    waitForChar = body[i];
                } else {
                    waitForChar = null;
                }
            }
            // TODO: some map - 'if' (first tag) require space after, 'or', 'and' spaces??
            // if (body[i] !== '\n' && body[i] !== ' ') {
            if (body[i] !== '\n') {
                resultBody += body[i];
            }
        }

        return this.options.blockStart + resultBody + this.options.blockEnd;
    }

    clearExtraSpaces(template) {
        let i;
        let startIndex = null;
        let tempSubstring;
        let resultString = '';

        for (i = 0; i < template.length + 1; i++) {
            if (!this.utils.isNull(startIndex)) {
                tempSubstring = template.substring(i - this.options.blockEnd.length, i);
                if (tempSubstring === this.options.blockEnd) {
                    resultString += this.getBlockWithoutExtraSpaces(template.substring(startIndex, i));
                    startIndex = null;
                }
            }
            if (this.utils.isNull(startIndex)) {
                tempSubstring = template.substring(i, i + this.options.blockStart.length);
                if (tempSubstring === this.options.blockStart) {
                    startIndex = i;
                } else if (!this.utils.isUndefined(template[i])) {
                    resultString += template[i];
                }
            }
        }

        return resultString;
    }
}

module.exports = BlocksHelper;