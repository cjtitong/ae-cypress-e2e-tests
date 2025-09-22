// File: TC24_download_invoice.cy.js
import { faker } from "@faker-js/faker";
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";
import AuthPage from "../../pages/AuthPage";
import AccountPage from "../../pages/AccountPage";
import CheckoutPage from "../../pages/CheckoutPage";
import PaymentPage from "../../pages/PaymentPage";

describe("TC24 - Download Invoice after purchase order", () => {
  it("Should place order, download invoice, and delete account", () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const cart = new CartPage();
    const auth = new AuthPage();
    const account = new AccountPage();
    const checkout = new CheckoutPage();
    const payment = new PaymentPage();

    const user = {
      title: "Mr",
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: "Test@1234",
      day: "15",
      month: "8",
      year: "1994",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: "Invoice Co",
      address1: "789 Invoice St",
      address2: "Unit 24",
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      zipcode: "9000",
      mobileNumber: "09173334444",
    };

    // Step 1: Visit home page
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 2–4: Add product to cart
    home.getProductsButton().click();
    products.verifyAllProductsPage();
    cart.addProductToCartByIndex(0);
    cart.verifyCartPageVisible();

    // Step 5–7: Checkout → register
    cart.clickProceedToCheckout();
    checkout.clickRegisterLogin();
    auth.fillSignupNameEmail(user.name, user.email);
    auth.submitSignup();
    auth.fillAccountInformation(user);
    auth.submitCreateAccount();
    auth.getAccountCreatedTitle().should("be.visible");
    auth.clickContinueAfterAccountAction();

    // Step 8: Confirm logged in
    account.getLoggedInAs(user.name).should("be.visible");

    // Step 9–10: Go to cart → checkout again
    cart.clickCartTopNav();
    cart.clickProceedToCheckout();

    // Step 11: Verify addresses + review order
    checkout.verifyAddressDetails(user);
    checkout.verifyReviewOrder();

    // Step 12–14: Place order
    checkout.fillOrderComment("Please send invoice");
    checkout.clickPlaceOrder();
    payment.fillPaymentDetails({
      name: `${user.firstName} ${user.lastName}`,
      cardNumber: "4111111111111111",
      cvc: "123",
      expiryMonth: "12",
      expiryYear: "2030",
    });
    payment.submitPayment();
    payment.verifyPaymentSuccess();

    // Step 15–16: Download invoice & verify file
    checkout.downloadInvoice();
    checkout.verifyInvoiceDownloaded(user, "500");

    // Step 17: Continue after invoice
    payment.clickContinueAfterOrder();

    // Step 18–19: Delete account
    account.getDeleteAccountButton().click();
    account.getAccountDeletedTitle().should("be.visible");
    auth.clickContinueAfterAccountAction();
  });
});
