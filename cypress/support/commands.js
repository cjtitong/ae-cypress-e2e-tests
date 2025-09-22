import { faker } from '@faker-js/faker'
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'

Cypress.Commands.add('goHome', () => {
  cy.visit('/')
  const home = new HomePage()
  home.getMainBanner().should('be.visible')
})

Cypress.Commands.add('registerUi', (user) => {
  // user: { name, email, password, firstName, lastName, ...}
  const auth = new AuthPage()
  cy.goHome()
  homeClickSignup()
  auth.fillSignupNameEmail(user.name, user.email)
  auth.submitSignup()
  auth.fillAccountInformation(user)
  auth.submitCreateAccount()
})

// helper for clicking Signup — keep short wrappers for readability
function homeClickSignup() {
  cy.get('a[href="/login"]').should('be.visible').click()
}

// login command
Cypress.Commands.add('loginUi', (email, password) => {
  cy.goHome()
  homeClickSignup()
  const auth = new AuthPage()
  auth.fillLogin(email, password)
  auth.submitLogin()
})
