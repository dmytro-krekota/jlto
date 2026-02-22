let spaceCleanupHelper = require('./spaceCleanupHelper');

/**
 * @class BlocksHelper
 */
class BlocksHelper {
  constructor(options) {
    this.options = options;
  }

  clearExtraSpaces(template) {
    return spaceCleanupHelper.clearTemplateExtraSpaces(
      template,
      this.options.blockStart,
      this.options.blockEnd,
      this.options.specialChars,
    );
  }
}

module.exports = BlocksHelper;
