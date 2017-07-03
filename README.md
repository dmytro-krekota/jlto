# JLTO [![Codeship](https://codeship.com/projects/c4c3b120-052e-0135-745d-6646a19db98e/status?branch=master)](https://app.codeship.com/projects/213501) [![Coverage](https://coveralls.io/repos/github/DmitryKrekota/jlto/badge.svg?branch=master)](https://coveralls.io/github/DmitryKrekota/jlto?branch=master) [![Dependencies](https://david-dm.org/DmitryKrekota/jlto.svg)](https://david-dm.org/DmitryKrekota/jlto) [![DevDependencies](https://david-dm.org/DmitryKrekota/jlto/dev-status.svg)](https://david-dm.org/DmitryKrekota/jlto?type=dev) [![Join the chat at https://gitter.im/DmitryKrekota_jlto/Lobby](https://badges.gitter.im/DmitryKrekota_jlto/Lobby.svg)](https://gitter.im/DmitryKrekota_jlto/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Jinja Like Templates Optimizer (JLTO) is a Nodejs-based tool for optimizing Jinja like templates.

**Keywords:** jinja, optimizer, liquid, min, jinjava, minify, nunjucks, minifier, twig, compressor, django. 

[![NPM](https://nodei.co/npm/jlto.png?downloads=true)](https://nodei.co/npm/jlto/)

### Supported template engines:
* [Nunjucks](https://mozilla.github.io/nunjucks/) (Tested with unit tests)
* [Twig.js](https://github.com/twigjs/twig.js) (Tested with unit tests)
* [LiquidNode](https://github.com/sirlantis/liquid-node) (Tested with unit tests)
* [Twig](https://twig.sensiolabs.org/)
* [Jinja](http://jinja.pocoo.org/)
* [Django](https://docs.djangoproject.com/en/1.11/ref/templates/language/)
* [Liquid](https://shopify.github.io/liquid/)
* [Jinjava](https://github.com/HubSpot/jinjava)

## Usage

**Simple example:**

```js
let jlto = require("jlto");
let template = `
{{ hello }}
{{   "<John   &   Paul> ?"     | escape   }}
{{ '2.7'   | round }}{%  if  product  %}Product exists.{%  endif  %}
`;
let optimizedTemplate = jlto.optimizeString(template);
// optimizedTemplate:
// `
//{{hello}}
//{{"<John   &   Paul> ?"|escape}}
//{{'2.7'|round}}{%if product%}Product exists.{%endif%}
// `
```

**Example of using minifyHtml option:**

```js
let jlto = require("jlto");
let template = `
<div {% if id %}id="{{ id | escape('html_attr') }}"{% endif %} class="section-container {{ classes | join(' ') | html_attribute }}">
    <div class="section-writables">
        {% for writable in writables  %}
            {{ writable | write | raw }}
        {% endfor %}
    </div>
</div>`;
let optimizedTemplate = jlto.optimizeString(template, {minifyHtml: true});
// optimizedTemplate:
// `<div {%if id%} id="{{id|escape('html_attr')}}" {%endif%} class="section-container {{classes|join(' ')|html_attribute}}"><div class="section-writables"> {%for writable in writables%} {{writable|write|raw}} {%endfor%} </div></div>`
```

**Example of "nunjucks" templates minification with custom GruntJS task:**

```js
module.exports = function(grunt) {
    grunt.registerTask('min-nunjucks', 'Min nunjucks templates', function() {
        let jlto = require("jlto");
        let fs = require('fs');
        let glob = require('glob');
        let done = this.async();
        glob('./**/*.nunjucks.html', (error, files) => {
            files.forEach((filePath) => {
                let fileContent;
                fileContent = fs.readFileSync(filePath).toString();
                try {
                    fileContent = jlto.optimizeString(fileContent, {minifyHtml: true});
                    fs.writeFileSync(filePath, fileContent);
                } catch (ignoded) {
                }
            });
            return done();
        });
    });
};
```

## Tests

Unit tests are written using Mocha and Chai. To run, invoke `npm test`.

## License

JLTO is available under the [MIT license](https://opensource.org/licenses/MIT), see the LICENSE file for more information.