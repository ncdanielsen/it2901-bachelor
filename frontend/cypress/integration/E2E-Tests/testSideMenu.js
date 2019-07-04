context("SideMenu Tests", () =>{

    describe("Test collapsible", function() {
    
        beforeEach(function() {
            cy.login()
            cy.visit("http://localhost:3000/home/")
        })
    
        it("Starts on Home page. Checks if menu logo is visible", function(){
            cy.get("div").find("img[alt='menu logo']").should('be.visible')
            
        })

        it("Clicks menu logo, then checks if SideMenu is properly hidden", function(){
            cy.get("div[id='SideBar']").should('be.visible')
            cy.get("div").find("img[alt='menu logo']").click()
            cy.get("div[id='SideBar']").should('not.be.visible')
        })

        
    
    })

    describe("Test SideMenu buttons", function() {
        beforeEach(function() {
            cy.login()
            cy.visit("http://localhost:3000/home/")
        })

        it("Clicks on 'My Data Source', then checks url", function(){
            cy.get('#SideBar > :nth-child(1)').should("be.visible")
            cy.get('#SideBar > :nth-child(1)').click()
            cy.url().should("include", "/myData")
            cy.contains("Upload New")
        })

        it("Selects a source. Expects text under 'My Data source' to no longer be 'Source not selected'", function(){
            //Checks that no data source is selected
            cy.get('#selectedDataSource').should('contain', 'Source not selected')
            
            //Selects a data source
            cy.contains('Source not selected').should('be.visible')
            cy.contains('My Data Source').click()
            cy.contains('Select').first().click()

            //Checks that data source has been chosen
            cy.get('#selectedDataSource').should('not.contain', 'Source not selected')
           
        })

        it("Clicks on 'Reference Data', then checks url", function(){
            cy.get('#SideBar > :nth-child(2)').should("be.visible")
            cy.get('#SideBar > :nth-child(2)').click()
            cy.url().should("include", "/refData")
            cy.contains("Upload New")
        })
    })

    describe("Test Kpi Overview", function() {
        beforeEach(function() {
            cy.login()
            cy.visit("http://localhost:3000/home/")
        })

        it("Clicks on 'Kpi Overview', then checks if kpi selection appears", function(){
            cy.visit("http://localhost:3000/home/myData")

            //Make sure that kpi selection is not visible
            cy.get('#kpiContainerId').should("not.be.visible")
            cy.get('#kpiBoxes').should('not.be.visible')

            //Click on 'Kpi Overview'
            cy.get('#SideBar > :nth-child(3)').should("be.visible")
            cy.get('#SideBar > :nth-child(3)').click()
            
            //Kpi selection should now be visible 
            cy.get('#kpiContainerId').should("be.visible")
            cy.get('#kpiContainerId').children().should("be.visible")
            cy.get('#kpiBoxes').children().should('be.visible')
            
        })
        it("Test Single-select", function(){
            //Not working atm
            cy.get('#SideBar > :nth-child(3)').click()
            cy.get('#selectedKpi').first().should('have.css', 'background-color').and('equal', "rgba(0, 0, 0, 0)")
            cy.get('#kpiBoxes > :nth-child(1)').click()
            cy.get('#selectedKpi').first().should('have.css', 'background-color').and('not.equal', "rgba(0, 0, 0, 0)")
        })
        it("Test Multi-select", function(){
            //Open Kpi Selection
            cy.get('#SideBar > :nth-child(3)').click()

            //Check that none of the boxes have been selected
            cy.get('#kpiBoxes > :nth-child(1)').should('have.css', 'background-color').and('equal', "rgba(0, 0, 0, 0)")
            cy.get('#kpiBoxes > :nth-child(2)').should('have.css', 'background-color').and('equal', "rgba(0, 0, 0, 0)")
            
            //Click 'Multi-Select' and click the two first kpi-boxes. 
            //Check that they have been selected by comparing colour. Should be #53b49b
            cy.get('#multiSelect').click()
            cy.get('#kpiBoxes > :nth-child(1)').click().should('have.css', 'background-color').and('not.equal', "rgba(0, 0, 0, 0)")
            cy.get('#kpiBoxes > :nth-child(2)').click().should('have.css', 'background-color').and('not.equal', "rgba(0, 0, 0, 0)")
        })

    })
   
})

