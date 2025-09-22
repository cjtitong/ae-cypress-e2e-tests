import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";

describe("TC08 - Verify All Products and Product Detail Page", () => {
  const home = new HomePage();
  const products = new ProductsPage();

  it("Should display all products and product detail", () => {
    // Step 1-3: Visit and verify home
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 4-5: Navigate to products and verify
    home.getProductsButton().click();
    products.verifyAllProductsPage();

    // Step 6: Product list is visible
    cy.get(products.productCards).should("be.visible").and("have.length.greaterThan", 0);

    // Step 7: Click first product "View Product"
    cy.get(products.productCards).first().contains("View Product").click();

    // Step 8-9: Verify product detail is visible
    products.verifyProductDetailVisible();
    cy.contains("Category:").should("be.visible");
    cy.contains("Availability:").should("be.visible");
    cy.contains("Condition:").should("be.visible");
    cy.contains("Brand:").should("be.visible");
  });
});
