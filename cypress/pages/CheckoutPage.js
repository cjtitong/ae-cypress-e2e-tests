import fs from "fs";

class CheckoutPage {
  clickRegisterLogin() {
    cy.contains("Register / Login", { timeout: 10000 })
      .should("be.visible")
      .click();

    // Guard navigation (force visit if stuck on /view_cart)
    cy.url().then((url) => {
      if (!url.includes("/login")) {
        cy.visit("/login");
      }
    });
  }

  fillOrderComment(comment) {
    cy.get('textarea[name="message"]').clear().type(comment);
  }

  verifyAddressDetails(user) {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    cy.get("#address_delivery", { timeout: 10000 }).should(
      "contain.text",
      fullName
    );
    cy.get("#address_invoice", { timeout: 10000 }).should(
      "contain.text",
      fullName
    );
  }

  verifyReviewOrder() {
    cy.contains("Review Your Order", { timeout: 20000 }).should("be.visible");
    cy.get("#cart_info", { timeout: 15000 }).should("be.visible");
  }

  enterPaymentDetails({ name, cardNumber, cvc, expiryMonth, expiryYear }) {
    cy.get('input[name="name_on_card"]').clear().type(name);
    cy.get('input[name="card_number"]').clear().type(cardNumber);
    cy.get('input[name="cvc"]').clear().type(cvc);
    cy.get('input[name="expiry_month"]').clear().type(expiryMonth);
    cy.get('input[name="expiry_year"]').clear().type(expiryYear);
  }

  placeOrder() {
    this.verifyReviewOrder();
    cy.contains("a.btn.btn-default.check_out", "Place Order", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });
  }

  clickPlaceOrder() {
    this.placeOrder();
  }

  downloadInvoice() {
    cy.contains("Download Invoice", { timeout: 15000 })
      .should("be.visible")
      .click({ force: true });
  }

  verifyInvoiceDownloaded(user, amount = "500") {
    const downloadsFolder = Cypress.config("downloadsFolder");
    const filePath = `${downloadsFolder}/invoice.txt`;

    cy.readFile(filePath, { timeout: 15000 }).should((content) => {
      expect(content).to.contain(`Hi ${user.firstName} ${user.lastName}`);
      expect(content).to.contain(`Your total purchase amount is ${amount}`);
      expect(content).to.contain("Thank you");
    });
  }
}

export default CheckoutPage;
