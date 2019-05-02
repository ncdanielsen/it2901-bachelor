context("Test MainView", () =>{
    
    describe("Test Graph", function() {
    
        beforeEach(function() {
            cy.login()
            cy.visit("http://localhost:3000/home/")
        })

        it("Try to view single kpi in graph with reference values", function(){
            cy.contains("Welcome")
            cy.contains("My Data Source").click()
            cy.contains('Select').first().click()
            cy.contains('Reference Data').click()
            cy.contains('Select').first().click()
            cy.contains('KPI Overview').click()
            cy.get('#kpiBoxes > :nth-child(1)').click()
            cy.get('#graphContainerId').should('be.visible')
            cy.get('#lineGraphId').should('be.visible')
            
        })
        
        it("Try to view multiple kpi's in graph with reference values", function(){
            cy.contains("Welcome")
            cy.contains("My Data Source").click()
            cy.contains('Select').first().click()
            cy.contains('Reference Data').click()
            cy.contains('Select').first().click()
            cy.contains('KPI Overview').click()
            cy.get('#multiSelect').click()
            cy.get('#kpiBoxes > :nth-child(1)').click()
            cy.get('#kpiBoxes > :nth-child(2)').click()
            cy.get('#graphContainerId').should('be.visible')
            cy.get('#lineGraphId').should('be.visible')
            
        })

        it("Try to view multiple kpi's in both Radargraph and Linegraph", function(){
            cy.contains("Welcome")
            cy.contains("My Data Source").click()
            cy.contains('Select').first().click()
            cy.contains('Reference Data').click()
            cy.contains('Select').first().click()
            cy.contains('KPI Overview').click()
            cy.get('#multiSelect').click()
            cy.get('#kpiBoxes > :nth-child(1)').click()
            cy.get('#kpiBoxes > :nth-child(2)').click()
            cy.get('#kpiBoxes > :nth-child(3)').click()
            cy.get('#graphContainerId').should('be.visible')
            cy.get('#lineGraphId').should('be.visible')
            cy.contains('Chart Type').trigger("mouseover")
            cy.contains('Line')
            cy.contains('Radar').click()
            cy.get('#graphContainerId').should('be.visible')
            cy.get('#radarGraphId').should('be.visible')
            cy.contains('Calculated KPI').should('be.visible')
            cy.contains('Reference KPI').should('be.visible')
            
        })
    })
    
})

