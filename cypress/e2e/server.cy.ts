describe('index page', () => {
  context('seo', () => {
    it('generates the open graph image', () => {
      cy.visit('/__cypress/og')
      cy.compareSnapshot('og')
    })
  })
})
