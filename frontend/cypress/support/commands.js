// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add('signup', () => {
    cy.visit("http://localhost:3000/login/")
    cy.get("#createNewUserEmail").type('e2eTest@mail.com')
    cy.get("#createNewUserPassword").type('e2eTestPassword')
    cy.contains('Create new user').click()
    cy.location("pathname", {timeout: 10000})
        .should('include', '/home')
})

Cypress.Commands.add('login', () => {
    cy.visit("http://localhost:3000/login/")
    cy.get("#loginEmail").type('e2eTest@mail.com')
    cy.get("#loginPassword").type('e2eTestPassword')
    cy.contains('Log in').click()
    cy.location("pathname", {timeout: 10000})
        .should('include', '/home')
})


Cypress.Commands.add('uploadData', () =>{
    cy.visit("http://localhost:3000/home/")
    cy.contains('My Data Source').click()
    cy.contains('Upload New').click()
    cy.get("#ckpiNameInput").type("e2eTestCkpi")
    cy.get("#ckpiDescInput").type("e2e description")
    //cy.get('#kpiSetSourceFile').trigger('drop', )

})

Cypress.Commands.add('deleteUser', () => {
    cy.visit("http://localhost:3000/profile/")
    cy.contains("Delete user").click()
})


// 
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
