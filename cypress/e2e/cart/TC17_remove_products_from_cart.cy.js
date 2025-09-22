// cypress/e2e/cart/TC17_remove_products_from_cart.cy.js
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";

describe("TC17 - Remove Products from Cart", () => {
  const home = new HomePage();
  const products = new ProductsPage();
  const cart = new CartPage();

  it("Add products and remove them from cart", () => {
    // Step 1: Visit home
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 2: Go to Products
    home.getProductsButton().click();
    products.verifyAllProductsPage();

    // Step 3: Add two products
    products.addProductToCartByIndex(0);
    products.clickContinueShopping();
    products.addProductToCartByIndex(1);
    products.clickViewCart();

    // Step 4: Verify both products present
    cart.verifyCartPageVisible();
    cart.verifyProductsInCart([0, 1]);

    // Step 5: Remove first product
    cart.removeProductByIndex(0);

    // Step 6: Verify cart is updated (1 product left)
    cy.get(cart.cartRows).should("have.length", 1);

    // Step 7: Remove second product
    cart.removeProductByIndex(0);

    // Step 8: Verify cart is empty
    cart.verifyProductRemoved();
  });
});
