let Default = require('./core/default');
let ExpressionsHelper = require('./helpers/expressionsHelper');
let BlocksHelper = require('./helpers/blocksHelper');
let CommentsHelper = require('./helpers/commentsHelper');
let minify = require('html-minifier-next').minify;

/**
 * @class JLTO
 * @classdesc JLTO - Jinja Like Templates Optimizer.
 */
class JLTO {
  constructor() {
    this.defaultOptions = new Default().options;
  }

  async optimizeString(string, options = {}) {
    let resolvedOptions = {...this.defaultOptions, ...options};

    if (resolvedOptions.removeComments) {
      string = new CommentsHelper(resolvedOptions).removeComments(string);
    }
    if (resolvedOptions.cleanupExpressions) {
      string = new ExpressionsHelper(resolvedOptions).clearExtraSpaces(string);
    }
    if (resolvedOptions.cleanupBlocks) {
      string = new BlocksHelper(resolvedOptions).clearExtraSpaces(string);
    }
    if (resolvedOptions.minifyHtml) {
      let minifyHtmlOptions = {
        ...this.defaultOptions.minifyHtmlOptions,
        ...(options.minifyHtmlOptions || {}),
      };

      return minify(string, minifyHtmlOptions);
    }

    return string;
  }
}

module.exports = JLTO;
