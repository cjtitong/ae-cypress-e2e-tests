import AuthPage from '../../pages/AuthPage'
import HomePage from '../../pages/HomePage'
import AccountPage from '../../pages/AccountPage'
import { faker } from '@faker-js/faker'

describe('TC04 - Logout User After Login', () => {
  it('Register, login, logout, and verify login page', () => {
    const home = new HomePage()
    const auth = new AuthPage()
    const account = new AccountPage()

    // --- Generate random user ---
    const user = {
      name: faker.person.firstName() + ' ' + faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      day: '10',
      month: '5',
      year: '1990',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'Canada',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.phone.number()
    }

    // --- Step 1: Register user ---
    cy.visit('/')
    home.getMainBanner().should('be.visible')
    home.getSignupLoginButton().click()
    auth.getNewUserSignupTitle().should('be.visible')
    auth.fillSignupNameEmail(user.name, user.email)
    auth.submitSignup()

    auth.fillAccountInformation(user)
    auth.submitCreateAccount()
    auth.getAccountCreatedTitle().should('be.visible')
    auth.getContinueButton().click()

    // --- Step 2: Verify user is logged in ---
    cy.contains(`Logged in as ${user.name}`, { timeout: 15000 }).should('be.visible')

    // --- Step 3: Logout ---
    account.getLogoutButton().click()

    // --- Step 4: Verify back on login page ---
    auth.getLoginTitle().should('be.visible')
  })
})
