describe("Calendar App", () => {
  it("should display heading", () => {
    cy.visit("/");
    cy.get("#heading").should("contain", "Calendar");
  });

  it("should navigate months", () => {
    cy.get("#next-month-btn").click();
    cy.get("#month-dropdown").should("not.have.value", new Date().getMonth());
  });

  it("should edit year", () => {
    cy.get("#year").dblclick();
    cy.get("#year-input").clear().type("2030{enter}");
    cy.get("#year").should("contain", "2030");
  });
});
