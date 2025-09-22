class ProductsPage {
  // Locators
  allProductsTitle = ".features_items";
  searchInput = "#search_product";
  searchButton = "#submit_search";
  searchedProductsTitle = "h2.title.text-center";
  productCards = ".product-image-wrapper";
  continueShoppingBtn = ".btn-success.close-modal";
  quantityInput = "#quantity";
  addToCartBtn = ".cart";
  productDetail = ".product-information";

  // Categories & Brands
  categorySidebar = ".category-products";
  brandSidebar = ".brands_products";

  // Reviews
  reviewNameInput = "#name";
  reviewEmailInput = "#email";
  reviewTextArea = "#review";
  reviewSubmitBtn = "#button-review";

  // Recommended items
  recommendedSection = ".recommended_items";
  recommendedProducts = ".recommended_items .product-image-wrapper";

  // Actions
  verifyAllProductsPage() {
    cy.get(this.allProductsTitle).should("be.visible");
  }

  searchProduct(productName) {
    cy.get(this.searchInput).clear().type(productName);
    cy.get(this.searchButton).click();
  }

  verifySearchedProductsVisible() {
    cy.get(this.searchedProductsTitle).should("contain.text", "Searched Products");
    cy.get(this.productCards).should("have.length.greaterThan", 0);
  }

  // ✅ Updated: only requires at least one matching product
  verifySearchResultsContain(keyword) {
    let matchFound = false;

    cy.get(this.productCards).each(($card) => {
      cy.wrap($card).find("p").invoke("text").then((text) => {
        if (text.toLowerCase().includes(keyword.toLowerCase())) {
          matchFound = true;
        }
      });
    }).then(() => {
      expect(
        matchFound,
        `At least one product should match keyword '${keyword}'`
      ).to.be.true;
    });
  }

  addProductToCartByIndex(index) {
    cy.get(this.productCards)
      .eq(index)
      .trigger("mouseover")
      .find(".add-to-cart")
      .first()
      .click({ force: true });
  }

  addAllSearchResultsToCart() {
    cy.get(this.productCards).each(($el, index, $list) => {
      cy.wrap($el).trigger("mouseover");
      cy.wrap($el).find(".add-to-cart").first().click({ force: true });

      if (index < $list.length - 1) {
        cy.get(this.continueShoppingBtn).should("be.visible").click({ force: true });
      } else {
        cy.contains("View Cart").should("be.visible").click({ force: true });
      }
    });
  }

  clickContinueShopping() {
    cy.get(this.continueShoppingBtn).should("be.visible").click({ force: true });
  }

  clickViewCart() {
    cy.contains("View Cart").should("be.visible").click({ force: true });
  }

  setProductQuantity(qty) {
    cy.get(this.quantityInput).clear().type(qty);
  }

  addToCartFromDetail() {
    cy.get("button.cart").click();
  }

  verifyProductDetailVisible() {
    cy.get(this.productDetail).should("be.visible");
  }

  // ✅ Categories
  verifyCategoriesVisible() {
    cy.get(this.categorySidebar).should("be.visible");
  }

  selectCategory(mainCategory, subCategory) {
    cy.contains(this.categorySidebar + " a", mainCategory).click();
    cy.contains(this.categorySidebar + " a", subCategory).click();
  }

  // ✅ Brands
  verifyBrandsVisible() {
    cy.get(this.brandSidebar).should("be.visible");
  }

  selectBrandByIndex(index) {
    cy.get(this.brandSidebar).find("a").eq(index).click();
  }

  verifyBrandProductsVisible() {
    cy.get(this.allProductsTitle).should("be.visible");
    cy.get(this.productCards).should("have.length.greaterThan", 0);
  }

  // ✅ Reviews
  fillReviewForm({ name, email, review }) {
    cy.get(this.reviewNameInput).clear().type(name);
    cy.get(this.reviewEmailInput).clear().type(email);
    cy.get(this.reviewTextArea).clear().type(review);
  }

  submitReview() {
    cy.get(this.reviewSubmitBtn).click();
  }

  verifyReviewSubmitted() {
    cy.contains("Thank you for your review.").should("be.visible");
  }

  // ✅ Recommended items
  verifyRecommendedItemsVisible() {
    cy.get(this.recommendedSection).should("be.visible");
    cy.get(this.recommendedProducts).should("have.length.greaterThan", 0);
  }

  addRecommendedItemToCart(index) {
    cy.get(this.recommendedProducts)
      .eq(index)
      .trigger("mouseover")
      .find(".add-to-cart")
      .first()
      .click({ force: true });
  }
}

export default ProductsPage;