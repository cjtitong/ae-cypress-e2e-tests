export default class AuthPage {
  // --- Titles ---
  getNewUserSignupTitle() { return cy.contains("New User Signup!", { timeout: 15000 }); }
  getLoginTitle() { return cy.contains("Login to your account", { timeout: 15000 }); }

  // --- Signup fields ---
  getSignupName() { return cy.get('input[data-qa="signup-name"]', { timeout: 10000 }); }
  getSignupEmail() { return cy.get('input[data-qa="signup-email"]', { timeout: 10000 }); }
  getSignupButton() { return cy.get('button[data-qa="signup-button"]', { timeout: 10000 }); }

  // --- Account info form ---
  getAccountInfoTitle() { return cy.contains("Enter Account Information", { timeout: 15000 }); }
  getMrRadio() { return cy.get("#id_gender1"); }
  getMrsRadio() { return cy.get("#id_gender2"); }
  getPasswordField() { return cy.get("#password"); }
  getDays() { return cy.get("#days"); }
  getMonths() { return cy.get("#months"); }
  getYears() { return cy.get("#years"); }
  getNewsletterCheckbox() { return cy.get("#newsletter"); }
  getOffersCheckbox() { return cy.get("#optin"); }
  getFirstName() { return cy.get("#first_name"); }
  getLastName() { return cy.get("#last_name"); }
  getCompany() { return cy.get("#company"); }
  getAddress1() { return cy.get("#address1"); }
  getAddress2() { return cy.get("#address2"); }
  getCountry() { return cy.get("#country"); }
  getState() { return cy.get("#state"); }
  getCity() { return cy.get("#city"); }
  getZipcode() { return cy.get("#zipcode"); }
  getMobileNumber() { return cy.get("#mobile_number"); }
  getCreateAccountButton() { return cy.get('button[data-qa="create-account"]', { timeout: 10000 }); }

  // --- After account created ---
  getAccountCreatedTitle() { return cy.contains("Account Created!", { timeout: 15000 }); }
  getContinueButton() { return cy.get('a[data-qa="continue-button"]', { timeout: 15000 }); }

  // --- Login fields ---
  getLoginEmail() { return cy.get('input[data-qa="login-email"]', { timeout: 10000 }); }
  getLoginPassword() { return cy.get('input[data-qa="login-password"]', { timeout: 10000 }); }
  getLoginButton() { return cy.get('button[data-qa="login-button"]', { timeout: 10000 }); }

  // --- Errors ---
  getSignupError() { return cy.contains("Email Address already exist!", { timeout: 10000 }); }
  getLoginError() { return cy.contains("Your email or password is incorrect!", { timeout: 10000 }); }

  // --- Flows ---
  fillSignupNameEmail(name, email) {
    cy.url().then(url => { if (!url.includes("/login")) cy.visit("/login"); });
    this.getNewUserSignupTitle().should("be.visible");
    this.getSignupName().clear().type(name);
    this.getSignupEmail().clear().type(email);
  }

  submitSignup() { this.getSignupButton().should("be.visible").click(); }

  fillAccountInformation(user) {
    this.getAccountInfoTitle().should("be.visible");
    if (user.title === "Mr") this.getMrRadio().check(); else this.getMrsRadio().check();
    this.getPasswordField().type(user.password);
    this.getDays().select(user.day.toString());
    this.getMonths().select(user.month.toString());
    this.getYears().select(user.year.toString());
    if (user.newsletter) this.getNewsletterCheckbox().check();
    if (user.offers) this.getOffersCheckbox().check();
    this.getFirstName().type(user.firstName);
    this.getLastName().type(user.lastName);
    this.getCompany().type(user.company);
    this.getAddress1().type(user.address1);
    this.getAddress2().type(user.address2);
    this.getCountry().select(user.country);
    this.getState().type(user.state);
    this.getCity().type(user.city);
    this.getZipcode().type(user.zipcode);
    this.getMobileNumber().type(user.mobileNumber);
  }

  submitCreateAccount() { this.getCreateAccountButton().should("be.visible").click(); }

  // ✅ Safe Continue button click after account actions
  clickContinueAfterAccountAction() {
    this.getContinueButton().should("be.visible").click();
  }

  // --- Login flows ---
  fillLogin(email, password) {
    cy.url().then(url => { if (!url.includes("/login")) cy.visit("/login"); });
    this.getLoginTitle().should("be.visible");
    this.getLoginEmail().clear().type(email);
    this.getLoginPassword().clear().type(password);
  }

  // ✅ Alias method so TC16 works without changes
  fillLoginCredentials(email, password) {
    this.fillLogin(email, password);
  }

  submitLogin() { this.getLoginButton().should("be.visible").click(); }

  login(email, password) {
    this.fillLogin(email, password);
    this.submitLogin();
    cy.contains("Logged in as", { timeout: 15000 }).should("be.visible");
  }
}
