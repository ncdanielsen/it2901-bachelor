context("Test User Scenarios", () =>{

    describe("Usability test Scenario", function() {

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
            cy.url().should('contain', '/faq')
            cy.contains('Frequently Asked Questions')
        })

        it("Try to upload ckpi data", function(){

        })
        it("Try to view your uploaded data", function(){
            cy.login()
            cy.contains("My Data Source").click()
            cy.contains('Select').first().click()
            cy.contains('KPI Overview').click()
            cy.contains('Energy need').click()
            cy.get('#graphContainerId').should('be.visible')
            cy.get('#lineGraphId').should('be.visible')
        })
        it("View energy need, use, and generation in same graph", function(){
            cy.login()
            cy.contains("My Data Source").click()
            cy.contains('Select').first().click()
            cy.contains('KPI Overview').click()
            cy.get('#multiSelect').click()
            cy.contains('Energy need').click()
            cy.contains('Energy use').click()
            cy.contains('Energy generation').click()
            cy.get('#graphContainerId').should('be.visible')
            cy.get('#lineGraphId').should('be.visible')
        })
        it("Upload reference data", function(){
            cy.login()
            cy.contains('Reference Data').click()
            cy.should('not.contain', 'E2E Ref Data')
            cy.contains('Upload New').click()
            cy.get('#ckpiNameInput').type('E2E Ref Data')
            cy.get('#ckpiDescInput').type('E2E Description')
            cy.get('#refDataCreate').click()
            cy.wait(3000)
            cy.visit("http://localhost:3000/home/refData")
            cy.contains('E2E Ref Data')
        })
        it("Compare ckpi with new reference data", function(){
            cy.login()
            cy.contains("My Data Source").click()
            cy.contains('Select').first().click()
            cy.contains('Reference Data').click()
            cy.contains('Select').first().click()
            cy.contains('KPI Overview').click()
            cy.get('#kpiBoxes > :nth-child(1)').click()
            cy.get('#graphContainerId').should('be.visible')
            cy.get('#lineGraphId').should('be.visible')
        })
        it("Edit previously uploaded reference data, then delete it", function(){
            cy.login()
            cy.visit("http://localhost:3000/home/refData")
            cy.contains('Edit').first().click()
            cy.get('#refDataDelete').click()
        })

        it("Delete user", function(){
            cy.visit("http://localhost:3000/login/")
            cy.get("#loginEmail").type('UserScenario@test.com')
            cy.get("#loginPassword").type('UserScenario')
            cy.contains('Log in').click()
            cy.wait(1500)
            cy.contains('Profile').click()
            cy.wait(1500)
            cy.contains('Delete user').click()
            cy.url().should('include', '/login')
        })


    })

})
