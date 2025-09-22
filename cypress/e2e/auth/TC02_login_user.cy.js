import AuthPage from '../../pages/AuthPage'
import HomePage from '../../pages/HomePage'
import AccountPage from '../../pages/AccountPage'
import { faker } from '@faker-js/faker'

describe('TC02 - Login User with correct credentials', () => {
  it('Register, logout, login again, and delete account', () => {
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

    // --- Step 1: Register new user ---
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

    // Verify user is logged in
    cy.contains(`Logged in as ${user.name}`, { timeout: 15000 }).should('be.visible')

    // --- Step 2: Logout ---
    account.getLogoutButton().click()
    auth.getLoginTitle().should('be.visible')

    // --- Step 3: Login with same user ---
    auth.fillLogin(user.email, user.password)
    auth.submitLogin()

    // Verify login success
    cy.get('a[href="/logout"]', { timeout: 15000 }).should('be.visible')
    cy.contains(`Logged in as ${user.name}`, { timeout: 15000 }).should('be.visible')

    // --- Step 4: Delete account ---
    account.getDeleteAccountButton().click()
    account.getAccountDeletedTitle().should('be.visible')
    cy.get('a').contains('Continue').click()
  })
})
