import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";

describe("TC18 - View Category Products", () => {
  const home = new HomePage();
  const products = new ProductsPage();

  it("Should navigate and verify category products", () => {
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    // Step 3: Verify categories
    products.verifyCategoriesVisible();

    // Step 4-6: Click Women > Dress
    products.selectCategory("Women", "Dress");
    cy.contains(/WOMEN - DRESS/i).should("be.visible");

    // Step 7-8: Click Men > Tshirts
    products.selectCategory("Men", "Tshirts");
    cy.contains(/MEN - TSHIRTS/i).should("be.visible");
  });
});
