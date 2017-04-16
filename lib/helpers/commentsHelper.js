/**
 * @class CommentsHelper
 */
class CommentsHelper {

    constructor(options) {
        this.options = options;
        this.utils = require('./../core/utils');
    }

    removeComments(template) {
        let i;
        let startIndex = null;
        let tempString;
        let resultString = '';

        for (i = 0; i < template.length + 1; i++) {
            if (!this.utils.isNull(startIndex)) {
                tempString = template.substring(i - this.options.commentEnd.length, i);
                if (tempString === this.options.commentEnd) {
                    startIndex = null;
                }
            }
            if (this.utils.isNull(startIndex)) {
                tempString = template.substring(i, i + this.options.commentStart.length);
                if (tempString === this.options.commentStart) {
                    startIndex = i;
                } else if (!this.utils.isUndefined(template[i])) {
                    resultString += template[i];
                }
            }
        }

        return resultString;
    }
}

module.exports = CommentsHelper;