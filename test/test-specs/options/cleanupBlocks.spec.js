let assert = require('assert');
let jlto = require('../../../');

describe('Tests for cleanupBlocks option', () => {
  it('Should trim extra spaces by default (cleanupBlocks is true)', async () => {
    let result = await jlto.optimizeString('<div>{% extends "base.html" %}</div>');

    assert.strictEqual('<div>{%extends "base.html"%}</div>', result);
  });

  it('Should trim extra spaces in block {%           extends "base.html"          %}', async () => {
    let result = await jlto.optimizeString('<div>{%           extends "base.html"          %}</div>', {
      cleanupBlocks: true,
    });

    assert.strictEqual('<div>{%extends "base.html"%}</div>', result);
  });

  it('Should trim extra spaces in three blocks', async () => {
    let result = await jlto.optimizeString(
      '<div>{%  extends "base.html"  %}</div><div>{%  extends "base.html"  %}</div><div>{%  extends "base.html"  %}</div>',
      {
        cleanupBlocks: true,
      },
    );

    assert.strictEqual(
      '<div>{%extends "base.html"%}</div><div>{%extends "base.html"%}</div><div>{%extends "base.html"%}</div>',
      result,
    );
  });

  it('Should trim extra spaces in template with custom blocks {{{ custom }}}', async () => {
    let result = await jlto.optimizeString(
      '<div>{{{ custom1 }}}</div><div>{{{  custom2  }}}{{{   custom3    }}}</div>',
      {
        cleanupBlocks: true,
        cleanupExpressions: false,
        blockStart: '{{{',
        blockEnd: '}}}',
      },
    );

    assert.strictEqual('<div>{{{custom1}}}</div><div>{{{custom2}}}{{{custom3}}}</div>', result);
  });

  it('Should trim extra spaces in template with custom blocks [ custom ]', async () => {
    let result = await jlto.optimizeString('<span>[ custom1 ][  custom2  ][   custom3    ]</span>', {
      cleanupBlocks: true,
      cleanupExpressions: false,
      blockStart: '[',
      blockEnd: ']',
    });

    assert.strictEqual('<span>[custom1][custom2][custom3]</span>', result);
  });

  it('Should trim extra spaces in template with custom blocks [== custom ]', async () => {
    let result = await jlto.optimizeString('<span>[== custom1 ][==  custom2  ][==   custom3    ]</span>', {
      cleanupBlocks: true,
      cleanupExpressions: false,
      blockStart: '[==',
      blockEnd: ']',
    });

    assert.strictEqual('<span>[==custom1][==custom2][==custom3]</span>', result);
  });

  it('Should not clear extra spaces in template for blocks', async () => {
    let result = await jlto.optimizeString('{%  extends "base.html"  %}{%  extends "base.html"  %}', {
      cleanupBlocks: false,
    });

    assert.strictEqual('{%  extends "base.html"  %}{%  extends "base.html"  %}', result);
  });

  it('Should clear extra spaces for template with block "include"', async () => {
    let result = await jlto.optimizeString(`{% include 'partials/sidebar.html.twig' with {'blog':page} %}`, {
      cleanupBlocks: true,
    });

    assert.strictEqual(`{%include 'partials/sidebar.html.twig' with {'blog':page}%}`, result);
  });

  it('Should preserve spaces inside block string with escaped quote', async () => {
    let result = await jlto.optimizeString('{% set value = "a\\" : b" %}', {
      cleanupBlocks: true,
    });

    assert.strictEqual('{%set value="a\\" : b"%}', result);
  });
});
