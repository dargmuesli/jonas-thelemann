describe('index page', () => {
  context('seo', () => {
    it('generates the open graph image', () => {
      cy.setCookie('ncc_c', 'clga')
      cy.visit('/__cypress/og')
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.get('[data-testid="nuxt-cookie-control-control-button"]').should(
        'be.visible'
      )
      cy.compareSnapshot('og')
    })
  })
})
