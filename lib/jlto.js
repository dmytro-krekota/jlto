/**
 * @class JLTO
 * @classdesc JLTO - Jinja Like Templates Optimizer.
 */
class JLTO {
    constructor() {
        this.defaultOptions = {
            expressionStart: '{{',
            expressionEnd: '}}',
            blockStart: '{%',
            blockEnd: '%}',
            commentStart: '{#',
            commentEnd: '#}',
            specialChars: ['+', '-', '*', ':', ',', '/', '=', '|', '~'],
            cleanupBlocks: true,
            cleanupExpressions: true,
            removeComments: true
        };
    }

    optimizeString(string, options = {}) {
        let expressionsHelper;
        let blocksHelper;
        let commentsHelper;

        this.options = Object.assign(Object.create(this.defaultOptions), options);

        expressionsHelper = new (require('./helpers/expressionsHelper'))(this.options);
        blocksHelper = new (require('./helpers/blocksHelper'))(this.options);
        commentsHelper = new (require('./helpers/commentsHelper'))(this.options);

        if (this.options.cleanupExpressions) {
            string = expressionsHelper.clearExtraSpaces(string);
        }
        if (this.options.cleanupBlocks) {
            string = blocksHelper.clearExtraSpaces(string);
        }
        if (this.options.removeComments) {
            string = commentsHelper.removeComments(string);
        }

        return string;
    }
}

module.exports = JLTO;