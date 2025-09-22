// cypress/e2e/cart/TC12_add_products_in_cart.cy.js
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";

describe("TC12 - Add Products in Cart", () => {
  const home = new HomePage();
  const products = new ProductsPage();
  const cart = new CartPage();

  it("Add two products and verify details in cart", () => {
    // Step 1-3: Visit home page and verify
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 4: Navigate to Products
    home.getProductsButton().click();
    products.verifyAllProductsPage();

    // Step 5-7: Add first and second product to cart
    products.addProductToCartByIndex(0);
    products.clickContinueShopping();
    products.addProductToCartByIndex(1);

    // Step 8: View Cart
    products.clickViewCart();

    // Step 9: Verify both products are added
    cart.verifyCartPageVisible();
    cart.verifyProductsInCart([0, 1]);

    // Step 10: Verify prices, quantity, and totals
    cart.verifyCartDetails();
  });
});
