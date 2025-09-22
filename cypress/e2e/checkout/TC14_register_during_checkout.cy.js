import { faker } from "@faker-js/faker";
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";
import AuthPage from "../../pages/AuthPage";
import AccountPage from "../../pages/AccountPage";
import CheckoutPage from "../../pages/CheckoutPage";
import PaymentPage from "../../pages/PaymentPage";

describe("TC14 - Place Order: Register while Checkout", () => {
  it("Should register user during checkout and place order", () => {
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
      day: "1",
      month: "1",
      year: "1990",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: "ACME Inc.",
      address1: "123 Test St",
      address2: "Apt 2",
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      zipcode: "1000",
      mobileNumber: "09171234567",
      newsletter: true,
      offers: true,
    };

    // Step 1: Visit home page
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 2: Navigate to Products and add first product to cart
    home.getProductsButton().click();
    products.verifyAllProductsPage();
    cart.addProductToCartByIndex(0); // ✅ now handles modal + redirects to cart

    // Step 3: Proceed to checkout from cart
    cart.clickProceedToCheckout();

    // Step 4: Register during checkout
    checkout.clickRegisterLogin();
    auth.fillSignupNameEmail(user.name, user.email);
    auth.submitSignup();
    auth.fillAccountInformation(user);
    auth.submitCreateAccount();
    auth.getAccountCreatedTitle().should("be.visible");
    auth.clickContinueAfterAccountAction();

    // Step 5: Confirm logged in
    account.getLoggedInAs(user.name).should("be.visible");

    // Step 6: Go back to Cart via top nav and proceed to checkout again
    cart.clickCartTopNav();
    cart.clickProceedToCheckout();

    // Step 7: Verify addresses and review order
    checkout.verifyAddressDetails(user);
    checkout.verifyReviewOrder();
    checkout.fillOrderComment("Please deliver fast");

    // Step 8: Place order
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

    // Step 9: Delete account after test
    account.getDeleteAccountButton().click();
    account.getAccountDeletedTitle().should("be.visible");
    auth.clickContinueAfterAccountAction();
  });
});
