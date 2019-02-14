let assert = require('chai').assert
let jlto = require('../../../')

describe('Tests for removeComments option', () => {
  it('Should clear comments by default (removeComments is true)', () => {
    let result = jlto.optimizeString('<div>{# I am a comment. #}</div>')

    assert.equal('<div></div>', result)
  })

  it('Should clear template with two comments', () => {
    let result = jlto.optimizeString('{# I am a comment 1. #}{# I am a comment 2. #}', {
      removeComments: true
    })

    assert.equal('', result)
  })

  it('Should not clear comments', () => {
    let result = jlto.optimizeString('{# I am a comment 1. #}{# I am a comment 2. #}', {
      removeComments: false
    })

    assert.equal('{# I am a comment 1. #}{# I am a comment 2. #}', result)
  })
})
