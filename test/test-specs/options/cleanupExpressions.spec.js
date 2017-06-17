let assert = require('chai').assert;
let jlto = require('../../../');

describe('Tests for cleanupExpressions option', () => {

    it('Should trim extra spaces by default (cleanupExpressions is true)', () => {
        let result = jlto.optimizeString('<div>{{ text }}</div>');

        assert.equal('<div>{{text}}</div>', result);
    });

    it('Should trim extra spaces in expression {{     text     }}', () => {
        let result = jlto.optimizeString('<div>{{     text     }}</div>', {
            cleanupExpressions: true
        });

        assert.equal('<div>{{text}}</div>', result);
    });

    it('Should trim extra spaces in three expressions', () => {
        let result = jlto.optimizeString('<div>{{ a1 }}</div><div>{{ a2 }}</div><div>{{ a3 }}</div>', {
            cleanupExpressions: true
        });

        assert.equal('<div>{{a1}}</div><div>{{a2}}</div><div>{{a3}}</div>', result);
    });

    it('Should trim extra spaces in template with custom expressions {{{ custom }}}', () => {
        let result = jlto.optimizeString('<div>{{{ custom1 }}}</div><div>{{{  custom2  }}}{{{   custom3    }}}</div>', {
            cleanupExpressions: true,
            expressionStart: '{{{',
            expressionEnd: '}}}'
        });

        assert.equal('<div>{{{custom1}}}</div><div>{{{custom2}}}{{{custom3}}}</div>', result);
    });

    it('Should trim extra spaces in template with custom expressions [ custom ]', () => {
        let result = jlto.optimizeString('<span>[ custom1 ][  custom2  ][   custom3    ]</span>', {
            cleanupExpressions: true,
            expressionStart: '[',
            expressionEnd: ']'
        });

        assert.equal('<span>[custom1][custom2][custom3]</span>', result);
    });

    it('Should trim extra spaces in template with custom expressions [== custom ]', () => {
        let result = jlto.optimizeString('<span>[== custom1 ][==  custom2  ][==   custom3    ]</span>', {
            cleanupExpressions: true,
            expressionStart: '[==',
            expressionEnd: ']'
        });

        assert.equal('<span>[==custom1][==custom2][==custom3]</span>', result);
    });


    it('Should not clear extra spaces in template for expressions', () => {
        let result = jlto.optimizeString('{{ a1 }}{{  a2  }}{{   a3   }}', {
            cleanupExpressions: false
        });

        assert.equal('{{ a1 }}{{  a2  }}{{   a3   }}', result);
    });

    it('Should clear newlines for 3 expressions', () => {
        let result = jlto.optimizeString(`{{ a1
        }}{{ a2
        }}{{ a3
        }}`, {cleanupExpressions: true});

        assert.equal('{{a1}}{{a2}}{{a3}}', result);
    });

    it('Should clear extra newlines for 2 math expressions', () => {
        let result = jlto.optimizeString(`
{{1
+
2 }}{{ 3
-
4}}`, {cleanupExpressions: true});

        assert.equal('\n{{1+2}}{{3-4}}', result);
    });

});