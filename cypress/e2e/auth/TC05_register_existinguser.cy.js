import AuthPage from '../../pages/AuthPage'
import HomePage from '../../pages/HomePage'
import { faker } from '@faker-js/faker'

describe('TC05 - Register User with existing email', () => {
  it('Should show error when trying to sign up with already registered email', () => {
    const home = new HomePage()
    const auth = new AuthPage()

    // --- Generate random user ---
    const user = {
      name: faker.person.firstName() + ' ' + faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      day: '15',
      month: '6',
      year: '1995',
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

    // --- Step 1: Register user first ---
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

    cy.contains(`Logged in as ${user.name}`, { timeout: 15000 }).should('be.visible')

    // Logout so we can access signup again
    cy.get('a[href="/logout"]').click()
    auth.getLoginTitle().should('be.visible')

    // --- Step 2: Try registering again with the same email ---
    auth.getNewUserSignupTitle().should('be.visible')
    auth.fillSignupNameEmail(user.name, user.email)
    auth.submitSignup()

    // --- Step 3: Verify error message via page object ---
    auth.getSignupError().should('be.visible')
  })
})
