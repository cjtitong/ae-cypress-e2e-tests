import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/ProductsPage";

describe("TC21 - Add Review on Product", () => {
  const home = new HomePage();
  const products = new ProductsPage();

  it("Should submit a product review", () => {
    cy.visit("/");
    home.getProductsButton().click();
    products.verifyAllProductsPage();

    // Step 5: View first product
    cy.get(products.productCards).first().contains("View Product").click();
    products.verifyProductDetailVisible();

    // Step 6: Verify review form
    cy.contains("Write Your Review").should("be.visible");

    // Step 7: Enter details
    products.fillReviewForm({
      name: "Tester",
      email: "tester@example.com",
      review: "Great product, good quality!"
    });

    // Step 8: Submit
    products.submitReview();

    // Step 9: Verify success
    cy.contains("Thank you for your review.").should("be.visible");
  });
});
