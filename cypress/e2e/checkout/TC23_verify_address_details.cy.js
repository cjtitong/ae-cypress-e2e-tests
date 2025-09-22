import { faker } from "@faker-js/faker";
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";
import AuthPage from "../../pages/AuthPage";
import AccountPage from "../../pages/AccountPage";
import CheckoutPage from "../../pages/CheckoutPage";

describe("TC23 - Verify Address Details in Checkout Page", () => {
  it("Should verify delivery and billing address match registration details", () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const cart = new CartPage();
    const auth = new AuthPage();
    const account = new AccountPage();
    const checkout = new CheckoutPage();

    const user = {
      email: faker.internet.email(),
      password: "Test@1234",
      day: "12",
      month: "9",
      year: "1995",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: "AddrCo",
      address1: "88 Test Lane",
      address2: "Suite 88",
      country: "Canada",
      state: "Quebec",
      city: "Montreal",
      zipcode: "7000",
      mobileNumber: "09172223333",
    };
    user.fullName = `${user.firstName} ${user.lastName}`;

    // Step 1: Visit home page
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 2–6: Register user
    home.getSignupLoginButton().click();
    auth.fillSignupNameEmail(user.fullName, user.email);
    auth.submitSignup();
    auth.fillAccountInformation(user);
    auth.submitCreateAccount();
    auth.getAccountCreatedTitle().should("be.visible");
    auth.clickContinueAfterAccountAction();
    account.getLoggedInAs(user.fullName).should("be.visible");

    // Step 7–10: Add product to cart
    home.getProductsButton().click();
    products.verifyAllProductsPage();
    products.addProductToCartByIndex(0);
    products.clickViewCart();
    cart.verifyCartPageVisible();

    // Step 11–13: Checkout + verify addresses
    cart.clickProceedToCheckout();
    checkout.verifyAddressDetails(user);

    // Step 14–15: Delete account
    account.getDeleteAccountButton().click();
    account.getAccountDeletedTitle().should("be.visible");
    auth.clickContinueAfterAccountAction();
  });
});
