describe('index page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('internationalization', () => {
    const textEnglish = 'Ninjaneer, studying at University of Kassel.'
    const textGerman = 'Ninjaneer, studiert an der Universität Kassel.'

    it('displays English translations', () => {
      cy.visit('/')
      cy.contains(textEnglish)
    })

    it('displays German translations', () => {
      cy.visit('/de')
      cy.contains(textGerman)
    })
  })

  context('visual regression', () => {
    if (Cypress.env('NODE_ENV') !== 'production') return

    it('looks as before', () => {
      cy.visit('/')
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.compareSnapshot('index')
    })
  })
})
