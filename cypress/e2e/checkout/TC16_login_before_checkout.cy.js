// File: TC16_login_before_checkout.cy.js
import { faker } from "@faker-js/faker";
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";
import AuthPage from "../../pages/AuthPage";
import AccountPage from "../../pages/AccountPage";
import CheckoutPage from "../../pages/CheckoutPage";
import PaymentPage from "../../pages/PaymentPage";

describe("TC16 - Place Order: Login before Checkout", () => {
  it("Should login before checkout and place order", () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const cart = new CartPage();
    const auth = new AuthPage();
    const account = new AccountPage();
    const checkout = new CheckoutPage();
    const payment = new PaymentPage();

    // ✅ Generate a random user for registration
    const user = {
      title: "Mr",
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: "Test@1234",
      day: "10",
      month: "7",
      year: "1992",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: "Global Tech",
      address1: "456 Example Ave",
      address2: "Floor 3",
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      zipcode: "2000",
      mobileNumber: "09171234568",
      newsletter: false,
      offers: false,
    };

    // Step 1: Visit home page
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 2–6: First register the user
    home.getSignupLoginButton().click();
    auth.fillSignupNameEmail(user.name, user.email);
    auth.submitSignup();
    auth.fillAccountInformation(user);
    auth.submitCreateAccount();
    auth.getAccountCreatedTitle().should("be.visible");
    auth.clickContinueAfterAccountAction();
    account.getLoggedInAs(user.name).should("be.visible");

    // Step 7: Logout
    account.getLogoutButton().click();
    home.getSignupLoginButton().should("be.visible");

    // Step 8: Login with registered user
    home.getSignupLoginButton().click();
    auth.fillLoginCredentials(user.email, user.password);
    auth.submitLogin();
    account.getLoggedInAs(user.name).should("be.visible");

    // Step 9–11: Add product & checkout
    home.getProductsButton().click();
    products.verifyAllProductsPage();
    cart.addProductToCartByIndex(0); // ✅ handles modal → cart
    cart.verifyCartPageVisible();
    cart.clickProceedToCheckout();

    // Step 12: Verify checkout details
    checkout.verifyAddressDetails(user);
    checkout.verifyReviewOrder();

    // Step 13–15: Place order
    checkout.fillOrderComment("Please process quickly");
    checkout.clickPlaceOrder();
    payment.fillPaymentDetails({
      name: `${user.firstName} ${user.lastName}`,
      cardNumber: "4111111111111111",
      cvc: "123",
      expiryMonth: "11",
      expiryYear: "2030",
    });
    payment.submitPayment();
    payment.verifyPaymentSuccess();

    // Step 16–17: Delete account after test
    account.getDeleteAccountButton().click();
    account.getAccountDeletedTitle().should("be.visible");
    auth.clickContinueAfterAccountAction();
  });
});
