let nunjucks = require('nunjucks');
let twig = require('twig');
let liquid = require('liquid-node');

/**
 * @class TestUtils
 */
class TestUtils {

    constructor() {
        this.nunjucks = {
            renderString(string, options) {
                return nunjucks.renderString(string, options);
            }
        };
        this.twig = {
            renderString(string, options) {
                return twig.twig({data: string}).render(options);
            }
        };
        this.liquid = {
            renderString(string, options) {
                this.liquidEngine = this.liquidEngine || new liquid.Engine();

                return this.liquidEngine.parseAndRender(string, options);
            }
        };
    }

}

module.exports = new TestUtils();