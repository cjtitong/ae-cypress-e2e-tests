// cypress/e2e/cart/TC13_verify_product_quantity_in_cart.cy.js
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";

describe("TC13 - Verify Product Quantity in Cart", () => {
  const home = new HomePage();
  const products = new ProductsPage();
  const cart = new CartPage();

  it("Add product with quantity and verify in cart", () => {
    // Step 1: Visit home
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 2: Go to Products
    home.getProductsButton().click();
    products.verifyAllProductsPage();

    // Step 3: Click on product detail
    cy.get(products.productCards).first().find("a").contains("View Product").click();
    products.verifyProductDetailVisible();

    // Step 4: Set quantity to 4
    products.setProductQuantity(4);

    // Step 5: Add to Cart
    products.addToCartFromDetail();
    products.clickViewCart();

    // Step 6: Verify quantity in cart
    cart.verifyCartPageVisible();
    cart.verifyProductQuantity(4);
  });
});
