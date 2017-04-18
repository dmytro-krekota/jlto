let nunjucks = require('nunjucks');
let twig = require('twig');

/**
 * * @class TestUtils
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
    }

}

module.exports = new TestUtils();