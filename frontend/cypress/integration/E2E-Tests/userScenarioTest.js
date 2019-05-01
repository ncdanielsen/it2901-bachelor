context("Test User Scenarios", () =>{
    
    describe("Test Graph", function() {
    
        it("Try to create a user", function(){
            cy.visit("http://localhost:3000/home/")
            cy.url().should('contain', 'login')
            cy.get('#createNewUserEmail').type("UserScenario@test.com")
            cy.get('#createNewUserPassword').type("UserScenario")
            cy.contains('Create new user').click()
            cy.url().should('contain', '/home')
            cy.should('not.contain', 'Create new user')
        })

        it("Try to navigate to FAQ", function(){
            cy.login()
            cy.url().should('contain', '/home')
            cy.contains('FAQ').click()
            cy.url().should('contain', '/Faq')
            cy.contains('Frequently Asked Questions')
        })

        it("Try to upload ckpi data", function(){

        })
        it("Try to view your uploaded data", function(){

        })
        it("View energy need, use, and generation in same graph", function(){

        })
        it("Upload reference data", function(){

        })
        it("Compare ckpi with new reference data", function(){

        })
        it("Edit previously uploaded reference data", function(){

        })

        it("Delete user", function(){
            cy.visit("http://localhost:3000/login/")
            cy.get("#loginEmail").type('UserScenario@test.com')
            cy.get("#loginPassword").type('UserScenario')
            cy.contains('Log in').click()
            cy.contains('Profile').click()
            cy.wait(500)
            cy.contains('Delete user').click()
            cy.url().should('include', '/login')
        })
        
        
    })
    
})

