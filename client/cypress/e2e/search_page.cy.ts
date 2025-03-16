/// <reference types="cypress" />

// https://on.cypress.io/introduction-to-cypress
// Use the following to log terminal: `cy.task("log", "my message")`

describe("test /search", () => {
    beforeEach(() => {
        cy.visit('http://client:5173/search')
    })


    // AC 1: Search by Product Name
    it("should allow typing in the search bar and display relevant results", () => {
        // Type "milk" into the search bar
        cy.get(".searchbar").type("milk{enter}");

        // Verify that the grid-container contains products (at least one result expected)
        cy.get(".grid-container")
            .children()
            .should("have.length", 1)
            .and("contain.text", "Milk");
    });


    // AC 2: Search Action Cancelation
    it("should clear the search input and reload the page when the clear button is clicked", () => {
        cy.get(".searchbar").type("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        // Click the clear (x) button
        cy.get("ion-searchbar .searchbar-clear-icon").click();

        // Verify the search bar is cleared
        cy.get(".searchbar").should("have.value", "");

        // Verify that the page reloads and shows results
        cy.get(".grid-container").children().should("have.length", 1);
    });


    //AC 3: Display Search Results
    it("should paginate product cards when more than 25 results are shown", () => {
        // Check if the pagination buttons are visible
        cy.get(".pagination-button");

    });

    it("shouldn't paginate product cards when fewer than 25 results are shown", () => {
        // Type a string of nonsense
        cy.get(".searchbar").type("mlkjlka{enter}")

        // Check if pagination buttons are not visible
        cy.get(".pagination-button").should("not.exist");

    });


    // AC 4: Proceed to next page of results
    it("should render prev and next pagination controls correctly", () => {
        // Verify that pagination controls are visible
        cy.get(".pagination").should("exist");

        // Verify that the "Previous" button is disabled on the first page
        cy.get(".controlButton").first().should("have.class", "button-disabled");

        // Verify that the "Next" button is enabled (if there are multiple pages)
        cy.get(".controlButton").last().should("not.be.disabled");
    });
    it("should navigate to the next page when the 'Next' button is clicked", () => {
        // Click the "Next" button
        cy.get(".controlButton").last().click();

        // Check that current page has updated (by checking active page button)
        cy.get(".pagination-button")
            .filter(".ion-color-primary")
            .should("contain", "2")
            .should("not.contain", "3");
    });
    it("should navigate to the previous page when the 'Previous' button is clicked", () => {
        // First, navigate to the second page
        cy.get(".controlButton").last().click();

        // Then, click the "Previous" button
        cy.get(".controlButton").first().click();

        // Verify that the current page has updated
        cy.get(".pagination-button")
            .filter(".ion-color-primary")
            .should("contain", "1");
    });
    it("should navigate to a specific page when a page number is clicked", () => {
        // Click a specific page number
        cy.get(".pagination-button").contains("3").click();

        // Verify that the current page has updated
        cy.get(".pagination-button")
            .filter(".ion-color-primary")
            .should("contain", "3");
    });


    // AC 5: No Relevant Search Results
    it("should show 'No results found' when no products match the search query", () => {
        // Type a random string that doesn't match any product
        cy.get(".searchbar").type("xyz123{enter}");

        // Verify that the 'No results found' message is displayed
        cy.get(".no-results-container").should("be.visible");
        cy.get(".no-results-container").contains("No results found");
    });


    //AC 7: Search query with less than 3 characters
    it("Should display error message when user has entered query that is shorter than 3 characters", () => {
        // Type a string of 2 characters
        cy.get(".searchbar").type("m{enter}")

        // Verify that the error message is displayed
        cy.get("ion-content").contains("Search query must be between 3 and 50 characters.");
    });


    // AC 9: Search query with capital letters
    it("should allow a search with capital letters ignored", () => {
        // Type "MILK" into the search bar and Simulate pressing Enter to trigger search
        cy.get(".searchbar").type("MILK{enter}");

        // Verify that the grid-container contains products (at least one result expected)
        cy.get(".grid-container")
            .children()
            .should("have.length", 1)
            .and("contain.text", "Milk");
    });
});
