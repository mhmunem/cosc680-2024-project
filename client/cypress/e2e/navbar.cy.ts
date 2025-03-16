/// <reference types="cypress" />

// https://on.cypress.io/introduction-to-cypress
// Use the following to log terminal: `cy.task("log", "my message")`

describe("Test Navbar Endpoints", () => {
    beforeEach(() => {
        cy.visit('http://client:5173/')
    })

    it("should navigate to the Store page", () => {
        cy.get("#tab-button-stores").contains("Stores").click()
        cy.url().should("include", "/stores")
    })

    it("should navigate to the search page", () => {
        cy.get("#tab-button-search").contains("Search").click()
        cy.url().should("include", "/search")
    })

    it("should navigate to the shopping list page", () => {
        cy.get("#tab-button-shoppinglist").contains("Shopping List").click()
        cy.url().should("include", "/shoppinglist")
    })

})
