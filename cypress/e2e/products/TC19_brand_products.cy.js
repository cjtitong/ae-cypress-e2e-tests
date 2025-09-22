import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";

describe("TC19 - View & Cart Brand Products", () => {
  const home = new HomePage();
  const products = new ProductsPage();

  it("Should display products by brand", () => {
    cy.visit("/");
    home.getProductsButton().click();
    products.verifyAllProductsPage();

    // Step 4: Verify brands visible
    products.verifyBrandsVisible();

    // Step 5-6: Click first brand
    products.selectBrandByIndex(0);
    cy.contains(/BRAND -/i).should("be.visible");
    products.verifyBrandProductsVisible();

    // Step 7-8: Click another brand
    products.selectBrandByIndex(1);
    cy.contains(/BRAND -/i).should("be.visible");
    products.verifyBrandProductsVisible();
  });
});
