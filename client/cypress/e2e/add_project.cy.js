describe("Add Project Page", () => {
  beforeEach(() => {
    // Change the URL to your running frontend
    cy.visit("http://localhost:5173/projects/new");
  });

  it("fills and submits the project form", () => {
    // If your app checks login, you may need to log in here or mock auth

    cy.get('input[label="Title"], input[name="title"]').type("Cypress Test Project");
    cy.get('textarea[label="Description"], textarea[name="description"]').type("This is a test project.");
    cy.get('input[label="Link"], input[name="link"]').type("https://example.com");
    cy.get('input[label="Technologies"], input[name="technologies"]').type("React, Node.js, MongoDB");

    cy.get('button').contains(/Add Project/i).click();

    // Optional: check for success message
    cy.contains(/Project added successfully/i);
  });
});
