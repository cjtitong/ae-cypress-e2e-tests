import { faker } from '@faker-js/faker'
import AuthPage from '../../pages/AuthPage'
import HomePage from '../../pages/HomePage'
import AccountPage from '../../pages/AccountPage'

describe('TC01 - Register User', () => {
  it('Register, verify and delete account', () => {
    const home = new HomePage()
    const auth = new AuthPage()
    const account = new AccountPage()

    // generate user
    const user = {
      name: faker.person.firstName(), // signup name
      email: faker.internet.email(),
      password: 'Test@1234',
      title: 'Mr',
      day: 1,
      month: 'January',
      year: '1990',
      newsletter: true,
      offers: true,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: 'ACME Inc.',
      address1: '123 Test St',
      address2: 'Apt 2',
      country: 'Canada',
      state: 'TestState',
      city: 'TestCity',
      zipcode: '1000',
      mobileNumber: '09171234567'
    }

    // Step 2 & 3: Visit and verify home
    cy.visit('/')
    home.getMainBanner().should('be.visible')

    // Step 4: Click signup/login
    home.getSignupLoginButton().click()

    // Step 5: Verify "New User Signup!" visible
    auth.getNewUserSignupTitle().should('be.visible')

    // Step 6-7: Enter name & email and submit
    auth.fillSignupNameEmail(user.name, user.email)
    auth.submitSignup()

    // Step 8: Verify "Enter Account Information"
    auth.getAccountInfoTitle().should('be.visible')

    // Step 9-12: Fill account information
    auth.fillAccountInformation(user)

    // Step 13: Create account
    auth.submitCreateAccount()

    // Step 14: Verify "Account Created!"
    auth.getAccountCreatedTitle().should('be.visible')

    // Step 15: Click continue
    auth.getContinueButton().click()

    // Step 16: Verify logged in
    cy.contains(`Logged in as ${user.name}`).should('be.visible')

    // Step 17: Delete account
    account.getDeleteAccountButton().click()

    // Step 18: Verify "Account Deleted!"
    account.getAccountDeletedTitle().should('be.visible')
    auth.getContinueButton().click()
  })
})
