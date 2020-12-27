# JLTO

[![CircleCI](https://circleci.com/gh/dmytro-krekota/jlto.svg?style=svg)](https://app.circleci.com/pipelines/github/dmytro-krekota/jlto)
[![Coverage](https://coveralls.io/repos/github/dmytro-krekota/jlto/badge.svg?branch=master)](https://coveralls.io/github/dmytro-krekota/jlto?branch=master) [![Dependencies](https://david-dm.org/dmytro-krekota/jlto.svg)](https://david-dm.org/dmytro-krekota/jlto) [![DevDependencies](https://david-dm.org/dmytro-krekota/jlto/dev-status.svg)](https://david-dm.org/dmytro-krekota/jlto?type=dev) [![Join the chat at https://gitter.im/dmytro-krekota_jlto/Lobby](https://badges.gitter.im/dmytro-krekota_jlto/Lobby.svg)](https://gitter.im/dmytro-krekota_jlto/community?source=orgpage)

[![NPM](https://nodei.co/npm/jlto.png?downloads=true)](https://nodei.co/npm/jlto/)

> Jinja Like Templates Optimizer (JLTO) is a Nodejs-based tool for optimizing Jinja like templates.

**Gulp tool for JLTO:**

[gulp-jlto](https://www.npmjs.com/package/gulp-jlto)

**Supported template engines:**

- [Nunjucks](https://mozilla.github.io/nunjucks/) (Tested with unit tests)
- [Twig.js](https://github.com/twigjs/twig.js) (Tested with unit tests)
- [LiquidNode](https://github.com/sirlantis/liquid-node) (Tested with unit tests)
- [Twig](https://twig.sensiolabs.org/)
- [Jinja](http://jinja.pocoo.org/)
- [Django](https://docs.djangoproject.com/en/1.11/ref/templates/language/)
- [Liquid](https://shopify.github.io/liquid/)
- [Jinjava](https://github.com/HubSpot/jinjava)

**Available options:**

- expressionStart - symbols at the beginning of expressions
- expressionEnd - symbols at the end of expressions
- blockStart - symbols at the beginning of blocks
- blockEnd - symbols at the end of blocks
- commentStart - symbols at the beginning of comments
- commentEnd - symbols at the beginning of comments
- specialChars - special chars in blocks and expressions
- cleanupBlocks - flag for optimize blocks
- cleanupExpressions - flag for optimize expressions
- removeComments - flag for removing comments
- minifyHtml - flag for minifying html code with [html-minifier](https://www.npmjs.com/package/html-minifier)
- minifyHtmlOptions - options for html-minifier

See default values for above options [here](https://github.com/dmytro-krekota/jlto/blob/master/lib/core/default.js).

## Usage

**Simple example:**

```js
let jlto = require('jlto')
let template = `
{{ hello }}
{{   "<John   &   Paul> ?"     | escape   }}
{{ '2.7'   | round }}{%  if  product  %}Product exists.{%  endif  %}
`
let optimizedTemplate = jlto.optimizeString(template)
// optimizedTemplate:
// `
//{{hello}}
//{{"<John   &   Paul> ?"|escape}}
//{{'2.7'|round}}{%if product%}Product exists.{%endif%}
// `
```

**Example of using minifyHtml option:**

```js
let jlto = require('jlto')
let template = `
<div {% if id %}id="{{ id | escape('html_attr') }}"{% endif %} class="section-container {{ classes | join(' ') | html_attribute }}">
  <div class="section-writables">
    {% for writable in writables  %}
      {{ writable | write | raw }}
    {% endfor %}
  </div>
</div>`
let optimizedTemplate = jlto.optimizeString(template, {minifyHtml: true})
// optimizedTemplate:
// `<div {%if id%} id="{{id|escape('html_attr')}}" {%endif%} class="section-container {{classes|join(' ')|html_attribute}}"><div class="section-writables"> {%for writable in writables%} {{writable|write|raw}} {%endfor%} </div></div>`
```

**Example of "nunjucks" templates minification with the custom GruntJS task:**

```js
module.exports = (grunt) => {
  grunt.registerTask('min-nunjucks', 'Min nunjucks templates', () => {
    let jlto = require('jlto')
    let fs = require('fs')
    let glob = require('glob')
    let done = this.async()
    glob('./**/*.nunjucks.html', (error, files) => {
      files.forEach((filePath) => {
        let fileContent
        fileContent = fs.readFileSync(filePath).toString()
        try {
          fileContent = jlto.optimizeString(fileContent, {minifyHtml: true})
          fs.writeFileSync(filePath, fileContent)
        } catch (ignored) {}
      })
      return done()
    })
  })
}
```

## Tests

Unit tests are written using Mocha and Chai. To run, invoke `npm test`.

## License

JLTO is available under the [MIT license](https://opensource.org/licenses/MIT), see the LICENSE file for more information.
