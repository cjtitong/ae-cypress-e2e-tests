import HomePage from "../../pages/HomePage";
import CartPage from "../../pages/CartPage";
import ProductsPage from "../../pages/ProductsPage";

describe("TC22 - Add to Cart from Recommended Items", () => {
  const home = new HomePage();
  const cart = new CartPage();
  const products = new ProductsPage();

  it("Should add recommended item to cart", () => {
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 3-4: Scroll to bottom and verify recommended
    cy.scrollTo("bottom");
    products.verifyRecommendedItemsVisible();

    // Step 5: Add first recommended product
    products.addRecommendedItemToCart(0);

    // Step 6: Click View Cart
    products.clickViewCart();

    // Step 7: Verify product in cart
    cart.verifyCartPageVisible();
    cart.verifyProductsInCart([0]);
  });
});
