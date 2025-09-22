class PaymentPage {
  fillPaymentDetails({ name, cardNumber, cvc, expiryMonth, expiryYear }) {
    cy.get('input[name="name_on_card"]').type(name);
    cy.get('input[name="card_number"]').type(cardNumber);
    cy.get('input[name="cvc"]').type(cvc);
    cy.get('input[name="expiry_month"]').type(expiryMonth);
    cy.get('input[name="expiry_year"]').type(expiryYear);
  }

  selectPaymentMethod(method) {
    cy.get(`input[value="${method}"]`).check();
  }

  confirmPayment() {
    cy.get('button[data-qa="pay-button"]', { timeout: 10000 })
      .should("be.visible")
      .click();
  }
  submitPayment() { this.confirmPayment(); }

  verifyPaymentSuccess() {
    cy.contains(
      /Payment successful|Order Placed|Your order has been placed successfully/i,
      { timeout: 10000 }
    ).should("be.visible");
  }

  downloadInvoice() {
    cy.contains("Download Invoice", { timeout: 10000 }).should("be.visible").click();
    cy.readFile("cypress/downloads/invoice.txt", { timeout: 15000 }).should("exist");
  }

  verifyInvoiceDownloaded() {
    cy.contains("Invoice has been downloaded", { timeout: 10000 }).should("be.visible");
  }

  // ✅ Added for TC24 / flow continuation
  clickContinueAfterOrder() {
    cy.contains("Continue", { timeout: 10000 }).should("be.visible").click();
  }
}

export default PaymentPage;
