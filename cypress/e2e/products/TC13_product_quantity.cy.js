import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";

describe("TC13 - Verify Product Quantity in Cart", () => {
  const home = new HomePage();
  const products = new ProductsPage();
  const cart = new CartPage();

  it("Should add product with quantity 4 to cart", () => {
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    home.getProductsButton().click();
    products.verifyAllProductsPage();

    cy.get(products.productCards).first().contains("View Product").click();
    products.verifyProductDetailVisible();

    products.setProductQuantity(4);
    products.addToCartFromDetail();
    products.clickViewCart();

    cart.verifyCartPageVisible();
    cart.verifyProductQuantity(4);
  });
});
