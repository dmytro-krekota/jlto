/**
 * @class JLTO
 * @classdesc JLTO - Jinja Like Templates Optimizer.
 */
class JLTO {
  constructor() {
    this.defaultOptions = new (require('./core/default'))().options
  }

  optimizeString(string, options = {}) {
    let expressionsHelper
    let blocksHelper
    let commentsHelper
    this.options = {...this.defaultOptions, ...options}
    expressionsHelper = new (require('./helpers/expressionsHelper'))(this.options)
    blocksHelper = new (require('./helpers/blocksHelper'))(this.options)
    commentsHelper = new (require('./helpers/commentsHelper'))(this.options)

    if (this.options.removeComments) {
      string = commentsHelper.removeComments(string)
    }
    if (this.options.cleanupExpressions) {
      string = expressionsHelper.clearExtraSpaces(string)
    }
    if (this.options.cleanupBlocks) {
      string = blocksHelper.clearExtraSpaces(string)
    }
    if (this.options.minifyHtml) {
      let minify = require('html-minifier').minify
      this.options.minifyHtmlOptions = {
        ...this.defaultOptions.minifyHtmlOptions,
        ...(options.minifyHtmlOptions || {}),
      }
      string = minify(string, this.options.minifyHtmlOptions)
    }

    return string
  }
}

module.exports = JLTO
