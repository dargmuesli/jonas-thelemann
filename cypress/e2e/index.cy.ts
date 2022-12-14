describe('index page', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://api.github.com/users/dargmuesli/repos?per_page=1',
      (req) => {
        req.reply({
          fixture: 'githubApi.json',
          headers: {
            link: '<https://api.github.com/user/4778485/repos?per_page=1&page=2>; rel="next", <https://api.github.com/user/4778485/repos?per_page=1&page=1337>; rel="last"',
          },
        })
      }
    )
  })

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
    it('looks as before', () => {
      cy.setCookie('cookie_control_consent', 'true')
      cy.visit('/')
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.compareSnapshot('index')
    })
  })
})
