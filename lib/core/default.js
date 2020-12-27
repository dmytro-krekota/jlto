/**
 * * @class Default
 */
class Default {
  constructor() {
    this.options = {
      expressionStart: '{{',
      expressionEnd: '}}',
      blockStart: '{%',
      blockEnd: '%}',
      commentStart: '{#',
      commentEnd: '#}',
      specialChars: ['+', '-', '*', ':', ',', '%', '/', '=', '|', '~', '(', ')', '[', ']'],
      cleanupBlocks: true,
      cleanupExpressions: true,
      removeComments: true,
      minifyHtml: false,
      minifyHtmlOptions: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        ignoreCustomFragments: [/\{([{%])[^}]+[%}]\}/],
      },
    }
  }
}

module.exports = Default
