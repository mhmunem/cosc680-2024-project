/// <reference types="cypress" />

// https://on.cypress.io/introduction-to-cypress
// Use the following to log terminal: `cy.task("log", "my message")`
function log(msg: any) {
    cy.task('log', JSON.stringify(msg.html))
}

describe("test /stores", () => {
    beforeEach(() => {
        cy.visit('http://client:5173/stores')
    })

    it("selected stores should show up in favorites", () => {
        cy.get("#tab-button-1")
            .click()

        // select store
        cy.get("ion-item.item-has-start-slot:nth-child(1)")
            .click()

        cy.get("#tab-button-favorites")
            .click()

        cy.get("ion-list.md")
            .children()
            .contains("Woolworths Auckland Airport")
    })

    it("stores should not be preselected", () => {
        cy.get("#tab-button-1")
            .click()

        cy.get("ion-item.item-has-start-slot:nth-child(1)")
            .should('not.be.checked')
    })

    it("stores should be selectable", () => {
        cy.get("#tab-button-1")
            .click()

        cy.get("ion-item.item-has-start-slot:nth-child(1)")
            .click()

        cy.get("ion-item.item-has-start-slot:nth-child(1)")
            .get(".checkbox-checked")
    })

    it("stores should be deselectable", () => {
        cy.get("#tab-button-1")
            .click()

        // select
        cy.get("ion-item.item-has-start-slot:nth-child(1)")
            .click()

        // deselect
        cy.get("ion-item.item-has-start-slot:nth-child(1)")
            .click()

        cy.get("ion-item.item-has-start-slot:nth-child(1)")
            .should('not.be.checked')
    })

    it("max stores selected stores should give an error message", () => {
        cy.get("#tab-button-1")
            .click()

        for (let i = 1; i < 8; ++i) {
            cy.get(`ion-item.item-has-start-slot:nth-child(${i})`)
                .click()
        }

        cy.get("#tab-button-2").click()

        for (let i = 1; i < 7; ++i) {
            cy.get(`ion-item.item-has-start-slot:nth-child(${i})`)
                .click()
        }

        cy.get("#tab-button-3").click()

        for (let i = 1; i < 9; ++i) {
            cy.get(`ion-item.item-has-start-slot:nth-child(${i})`)
                .click()
        }

        cy.get("#ion-overlay-1").shadow().contains("You can choose up to 20 stores")
    })

    it("max stores selected stores error message should go away after 2 seconds", () => {
        cy.get("#tab-button-1")
            .click()

        for (let i = 1; i < 8; ++i) {
            cy.get(`ion-item.item-has-start-slot:nth-child(${i})`)
                .click()
        }

        cy.get("#tab-button-2").click()

        for (let i = 1; i < 7; ++i) {
            cy.get(`ion-item.item-has-start-slot:nth-child(${i})`)
                .click()
        }

        cy.get("#tab-button-3").click()

        for (let i = 1; i < 9; ++i) {
            cy.get(`ion-item.item-has-start-slot:nth-child(${i})`)
                .click()
        }

        cy.wait(4000).get("#ion-overlay-1").filter(':visible').should('not.exist')
    })

    it("deselect all stores button deselects all stores", () => {
        cy.get("#tab-button-1")
            .click()

        for (let i = 1; i < 8; ++i) {
            cy.get(`ion-item.item-has-start-slot:nth-child(${i})`)
                .click()
        }

        cy.get("#tab-button-favorites")
            .click()

        // click deselect all stores under this tab button
        cy.get("ion-button.md")
            .click()

        cy.get(".centered-text > h2:nth-child(2)").contains("Choose Stores")
    })

    it("stores selection is remains after switching to different tabs", () => {
        cy.get("#tab-button-1")
            .click()

        cy.get("ion-item.item-has-start-slot:nth-child(1)")
            .click()

        cy.get("#tab-button-home")
            .contains("Home")
            .click()

        cy.get("#tab-button-search")
            .contains("Search")
            .click()

        cy.get("#tab-button-shoppinglist")
            .contains("Shopping List")
            .click()

        cy.visit("/stores")

        cy.get("ion-list.md")
            .children()
            .contains("Woolworths Auckland Airport")
    })
})
