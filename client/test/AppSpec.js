import Page from 'react-page-object'
import React from 'react'
import App from 'app'

describe('AppSpec', function() {
  let page

  beforeEach(function() {
    page = new Page(<App />)
  })

  afterEach(function() {
    page.destroy()
  })

  it('should pass', function() {
    expect(page.content()).to.match(/Welcome to React/)
  })
})