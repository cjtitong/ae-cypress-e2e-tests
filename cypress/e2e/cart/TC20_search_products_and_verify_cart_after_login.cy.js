// cypress/e2e/cart/TC20_search_products_and_verify_cart_after_login.cy.js
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";
import AuthPage from "../../pages/AuthPage";

describe("TC20 - Search Products and Verify Cart After Login", () => {
  const home = new HomePage();
  const products = new ProductsPage();
  const cart = new CartPage();
  const auth = new AuthPage();

  const user = {
    email: "testuser@example.com",   // 🔧 must exist in AE
    password: "password123",
  };

  it("Search, add to cart, and verify persistence after login", () => {
    // Step 1: Visit site
    cy.visit("/");

    // Step 2: Go to Products
    home.getProductsButton().click();

    // Step 3: Verify ALL PRODUCTS page
    products.verifyAllProductsPage();

    // Step 4: Search for product(s)
    const searchKeyword = "dress"; // 🔧 guaranteed match
    products.searchProduct(searchKeyword);

    // Step 5: Verify search results
    products.verifySearchedProductsVisible();

    // Step 6: Add all search results to cart
    products.addAllSearchResultsToCart();

    // Step 7: Verify products visible in Cart
    cart.verifyCartPageVisible();
    cart.verifySearchedProductsInCart();

    // Step 8: Login
    home.getSignupLoginButton().click();
    auth.fillLogin(user.email, user.password);
    auth.submitLogin();

    // Step 9: Go to Cart again
    home.getCartButton().click();

    // Step 10: Verify products still in cart
    cart.verifyCartPageVisible();
    cart.verifySearchedProductsInCart();
  });
});
