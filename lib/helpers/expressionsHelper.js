let spaceCleanupHelper = require('./spaceCleanupHelper');

/**
 * @class ExpressionsHelper
 */
class ExpressionsHelper {
  constructor(options) {
    this.options = options;
  }

  clearExtraSpaces(template) {
    return spaceCleanupHelper.clearTemplateExtraSpaces(
      template,
      this.options.expressionStart,
      this.options.expressionEnd,
      this.options.specialChars,
    );
  }
}

module.exports = ExpressionsHelper;
