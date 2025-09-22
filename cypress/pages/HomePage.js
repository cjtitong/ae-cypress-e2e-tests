export default class HomePage {
  // A strong indicator that home page is loaded
  getMainBanner() {
    // Target the main slider section that always exists on home
    return cy.get('section#slider')
  }

  // Navbar buttons
  getSignupLoginButton() {
    return cy.get('a[href="/login"]').contains('Signup / Login')
  }

  getProductsButton() {
    return cy.get('a[href="/products"]').contains('Products')
  }

  getContactUsButton() {
    return cy.get('a[href="/contact_us"]').contains('Contact us')
  }

  getCartButton() {
    return cy.get('a[href="/view_cart"]').contains('Cart')
  }

  getTestCasesButton() {
    return cy.get('a[href="/test_cases"]').contains('Test Cases')
  }
}
