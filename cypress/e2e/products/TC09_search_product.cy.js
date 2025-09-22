import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";

describe("TC09 - Search Product", () => {
  const home = new HomePage();
  const products = new ProductsPage();

  it("Should search and display related products", () => {
    cy.visit("/");
    home.getMainBanner().should("be.visible");

    home.getProductsButton().click();
    products.verifyAllProductsPage();

    const keyword = "dress";
    products.searchProduct(keyword);

    // Step 7: Verify searched products section
    products.verifySearchedProductsVisible();

    // Step 8: Verify products match keyword
    products.verifySearchResultsContain(keyword);
  });
});
