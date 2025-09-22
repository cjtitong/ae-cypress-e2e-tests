import AuthPage from '../../pages/AuthPage'
import HomePage from '../../pages/HomePage'
import { faker } from '@faker-js/faker'

describe('TC03 - Login User with incorrect credentials', () => {
  it('Login with invalid email and password', () => {
    const home = new HomePage()
    const auth = new AuthPage()

    // --- Generate fake invalid credentials ---
    const invalidEmail = faker.internet.email()
    const invalidPassword = faker.internet.password()

    // Step 1: Visit home page
    cy.visit('/')
    home.getMainBanner().should('be.visible')

    // Step 2: Go to Signup/Login
    home.getSignupLoginButton().click()

    // Step 3: Verify login form
    auth.getLoginTitle().should('be.visible')

    // Step 4: Fill invalid credentials
    auth.fillLogin(invalidEmail, invalidPassword)
    auth.submitLogin()

    // Step 5: Verify error message
    cy.contains('Your email or password is incorrect!', { timeout: 10000 })
      .should('be.visible')
  })
})
