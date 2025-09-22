class CartPage {
  // Locators
  cartTable = "#cart_info_table";
  cartRows = "#cart_info_table tbody tr";
  cartPageHeader = "section#cart_items";
  removeButton = ".cart_quantity_delete";

  // Actions
  verifyProductsInCart(indexes) {
    cy.get(this.cartRows).should("have.length.at.least", indexes.length);
  }

  verifyPricesAndTotals() {
    cy.get(this.cartRows).each(($row) => {
      cy.wrap($row).within(() => {
        cy.get(".cart_price").should("be.visible");
        cy.get(".cart_quantity").should("be.visible");
        cy.get(".cart_total").should("be.visible");
      });
    });
  }

  verifyCartPageVisible() {
    cy.get(this.cartPageHeader, { timeout: 10000 }).should("be.visible");
  }

  verifyProductQuantity(expectedQty) {
    cy.get(this.cartRows)
      .first()
      .find(".cart_quantity")
      .should("contain.text", expectedQty);
  }

  removeProductByIndex(index) {
    cy.get(this.removeButton).eq(index).click();
  }

  verifyProductRemoved() {
    cy.get(this.cartRows).should("have.length", 0);
  }

  verifySearchedProductsInCart() {
    cy.get(this.cartRows).should("have.length.greaterThan", 0);
  }

  verifyProductInCartByIndex(index) {
    cy.get(this.cartRows).eq(index).should("be.visible");
  }

  verifyCartDetails() {
    this.verifyPricesAndTotals();
  }

  // ✅ Navigate to cart via top nav link (navbar only, no modal)
  clickCartTopNav() {
    cy.get("ul.nav.navbar-nav a[href='/view_cart']")
      .first()
      .should("be.visible")
      .click();
    this.verifyCartPageVisible();
  }

  // ✅ Proceed to Checkout logic (strict to page-level button)
  clickProceedToCheckout() {
    this.verifyCartPageVisible();
    cy.get("#cart_items a.btn.btn-default.check_out")
      .contains("Proceed To Checkout")
      .should("be.visible")
      .click();
  }

  // ✅ Add product to cart (handles modal → clicks "View Cart")
  addProductToCartByIndex(index) {
    cy.get(".product-image-wrapper").eq(index).trigger("mouseover");
    cy.get(".product-image-wrapper")
      .eq(index)
      .find(".add-to-cart")
      .first()
      .click({ force: true });

    // Handle modal if it appears
    cy.get("body").then(($body) => {
      if ($body.find("#cartModal").length > 0) {
        cy.get("#cartModal").should("be.visible");
        cy.get("#cartModal a[href='/view_cart']").click(); // ✅ go straight to cart
        this.verifyCartPageVisible();
      }
    });
  }
}

export default CartPage;
