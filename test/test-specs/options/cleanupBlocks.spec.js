let assert = require('chai').assert
let jlto = require('../../../')

describe('Tests for cleanupBlocks option', () => {
  it('Should trim extra spaces by default (cleanupBlocks is true)', () => {
    let result = jlto.optimizeString('<div>{% extends "base.html" %}</div>')

    assert.equal('<div>{%extends "base.html"%}</div>', result)
  })

  it('Should trim extra spaces in block {%           extends "base.html"          %}', () => {
    let result = jlto.optimizeString('<div>{%           extends "base.html"          %}</div>', {
      cleanupExpressions: true
    })

    assert.equal('<div>{%extends "base.html"%}</div>', result)
  })

  it('Should trim extra spaces in three blocks', () => {
    let result = jlto.optimizeString(
      '<div>{%  extends "base.html"  %}</div><div>{%  extends "base.html"  %}</div><div>{%  extends "base.html"  %}</div>',
      {
        cleanupExpressions: true
      }
    )

    assert.equal(
      '<div>{%extends "base.html"%}</div><div>{%extends "base.html"%}</div><div>{%extends "base.html"%}</div>',
      result
    )
  })

  it('Should trim extra spaces in template with custom blocks {{{ custom }}}', () => {
    let result = jlto.optimizeString('<div>{{{ custom1 }}}</div><div>{{{  custom2  }}}{{{   custom3    }}}</div>', {
      cleanupExpressions: true,
      blockStart: '{{{',
      blockEnd: '}}}'
    })

    assert.equal('<div>{{{custom1}}}</div><div>{{{custom2}}}{{{custom3}}}</div>', result)
  })

  it('Should trim extra spaces in template with custom blocks [ custom ]', () => {
    let result = jlto.optimizeString('<span>[ custom1 ][  custom2  ][   custom3    ]</span>', {
      cleanupExpressions: true,
      blockStart: '[',
      blockEnd: ']'
    })

    assert.equal('<span>[custom1][custom2][custom3]</span>', result)
  })

  it('Should trim extra spaces in template with custom blocks [== custom ]', () => {
    let result = jlto.optimizeString('<span>[== custom1 ][==  custom2  ][==   custom3    ]</span>', {
      cleanupExpressions: true,
      blockStart: '[==',
      blockEnd: ']'
    })

    assert.equal('<span>[==custom1][==custom2][==custom3]</span>', result)
  })

  it('Should not clear extra spaces in template for blocks', () => {
    let result = jlto.optimizeString('{%  extends "base.html"  %}{%  extends "base.html"  %}', {
      cleanupBlocks: false
    })

    assert.equal('{%  extends "base.html"  %}{%  extends "base.html"  %}', result)
  })

  it('Should clear extra spaces for template with block "include"', () => {
    let result = jlto.optimizeString(`{% include 'partials/sidebar.html.twig' with {'blog':page} %}`, {
      cleanupBlocks: true
    })

    assert.equal(`{%include 'partials/sidebar.html.twig' with {'blog':page}%}`, result)
  })
})
