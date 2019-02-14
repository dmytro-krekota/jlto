/**
 * @class ExpressionsHelper
 */
class ExpressionsHelper {
  constructor(options) {
    this.options = options
    this.utils = require('./../core/utils')
  }

  getExpressionWithoutExtraSpaces(expression) {
    let body = expression.slice(this.options.expressionStart.length).slice(0, -this.options.expressionEnd.length)
    let resultBody = ''
    let i
    let waitForChar

    body = body.trim()
    for (i = 0; i < body.length; i++) {
      if (waitForChar && body[i] !== waitForChar) {
        resultBody += body[i]
        continue
      }
      if (body[i] === '"' || body[i] === '\'') {
        if (!waitForChar) {
          waitForChar = body[i]
        } else {
          waitForChar = null
        }
      }
      if (this.options.specialChars.indexOf(body[i]) >= 0) {
        resultBody = resultBody.trim()
      }
      if (this.options.specialChars.indexOf(resultBody[resultBody.length - 1]) >= 0 && body[i] === ' ') {
        continue
      }
      if (resultBody[resultBody.length - 1] === ' ' && body[i] === ' ') {
        continue
      }
      if (body[i] !== '\n') {
        resultBody += body[i]
      }
    }

    return this.options.expressionStart + resultBody + this.options.expressionEnd
  }

  clearExtraSpaces(template) {
    let i
    let startIndex = null
    let tempSubstring
    let resultString = ''

    for (i = 0; i < template.length + 1; i++) {
      if (!this.utils.isNull(startIndex)) {
        tempSubstring = template.substring(i - this.options.expressionEnd.length, i)
        if (tempSubstring === this.options.expressionEnd) {
          resultString += this.getExpressionWithoutExtraSpaces(template.substring(startIndex, i))
          startIndex = null
        }
      }
      if (this.utils.isNull(startIndex)) {
        tempSubstring = template.substring(i, i + this.options.expressionStart.length)
        if (tempSubstring === this.options.expressionStart) {
          startIndex = i
        } else if (!this.utils.isUndefined(template[i])) {
          resultString += template[i]
        }
      }
    }

    return resultString
  }
}

module.exports = ExpressionsHelper
