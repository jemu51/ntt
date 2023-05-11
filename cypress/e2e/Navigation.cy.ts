describe("Navigation", () => {
  describe("Static pages", () => {
    it("should have github link", () => {
      // Start from the index page
      cy.visit("/");

      // // The index page should contain an h1
      // cy.findByRole("heading", {
      //   name: "Live Cam",
      // });
      // cy.findByText(/Copyright NTT./i).should("exist");
      cy.get('a[data-testid="githubLink"]').should("exist");
      // // Find a link containing "About" text and click it
      // cy.findByRole("link", { name: "About" }).click();

      // // The new url should include "/about"
      // cy.url().should("include", "/about");

      // // The new page should contain two "lorem ipsum" paragraphs
      // cy.findAllByText("Lorem ipsum dolor sit amet", { exact: false }).should(
      //   "have.length",
      //   2
      // );
    });

    it("should take screenshot of the homepage", () => {
      cy.visit("/");

      // Wait until the page is displayed
      cy.get('a[data-testid="githubLink"]').should("exist");

      cy.percySnapshot("Homepage");
    });

    // it("should take screenshot of the About page", () => {
    //   cy.visit("/about");

    //   // Wait until the page is displayed
    //   cy.findByRole("link", { name: "About" });

    //   cy.percySnapshot("About");
    // });
  });
});
