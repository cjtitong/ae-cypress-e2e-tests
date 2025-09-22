// File: TC15_register_before_checkout.cy.js
import { faker } from "@faker-js/faker";
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";
import AuthPage from "../../pages/AuthPage";
import AccountPage from "../../pages/AccountPage";
import CheckoutPage from "../../pages/CheckoutPage";
import PaymentPage from "../../pages/PaymentPage";

describe("TC15 - Place Order: Register before Checkout", () => {
  it("Should register user before checkout and place order", () => {
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
      day: "5",
      month: "6",
      year: "1990",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: "Test Co",
      address1: "123 Test St",
      address2: "Suite 5",
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      zipcode: "5000",
      mobileNumber: "09170001111",
      newsletter: true,
      offers: true,
    };

    // Step 1: Visit home page
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 2–6: Register new user
    home.getSignupLoginButton().click();
    auth.fillSignupNameEmail(user.name, user.email);
    auth.submitSignup();
    auth.fillAccountInformation(user);
    auth.submitCreateAccount();
    auth.getAccountCreatedTitle().should("be.visible");
    auth.clickContinueAfterAccountAction();

    // Step 7: Confirm logged in
    account.getLoggedInAs(user.name).should("be.visible");

    // Step 8–10: Add product & view cart
    home.getProductsButton().click();
    products.verifyAllProductsPage();
    cart.addProductToCartByIndex(0); // ✅ goes straight to cart
    cart.verifyCartPageVisible();

    // Step 11: Proceed to checkout
    cart.clickProceedToCheckout();

    // Step 12: Verify checkout details
    checkout.verifyAddressDetails(user);
    checkout.verifyReviewOrder();

    // Step 13–15: Place order
    checkout.fillOrderComment("Test order");
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

    // Step 17–18: Delete account after test
    account.getDeleteAccountButton().click();
    account.getAccountDeletedTitle().should("be.visible");
    auth.clickContinueAfterAccountAction();
  });
});
