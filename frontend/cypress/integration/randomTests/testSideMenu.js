context("SideMenu Tests", () =>{
    describe("Test collapsible", function() {
    
        beforeEach(function() {
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
            cy.visit("http://localhost:3000/home/")
        })

        it("Clicks on 'My Data Source', then checks url", function(){
            cy.get('#SideBar > :nth-child(1)').should("be.visible")
            cy.get('#SideBar > :nth-child(1)').click()
            cy.url().should("include", "/myData")
        })

        it("Selects a source. Expects text under 'My Data source' to no longer be 'Source not selected'", function(){
            cy.get('#SideBar > :nth-child(1)').should("be.visible")
            //cy.get(':nth-child(1) > :nth-child(1) > .DataSource_buttonContent__4tMfg').should('contain', "Source not selected")
            cy.get('#SideBar > :nth-child(1)').click()
            /*
            cy.get(':nth-child(1) > .KpiSetListItem_kpiButtonSection__2cUpu > .KpiSetListItem_kpiOptionBottom__3FBp0 > .KpiSetListItem_selectButton__afkQI')
            .click()
            cy.get(':nth-child(1) > :nth-child(1) > .DataSource_buttonContent__4tMfg').should('not.contain', "Source not selected")
            */
        })

        it("Clicks on 'Reference Data', then checks url", function(){
            cy.get('#SideBar > :nth-child(2)').should("be.visible")
            cy.get('#SideBar > :nth-child(2)').click()
            cy.url().should("include", "/refData")
        })
    })

    describe("Test Kpi Overview", function() {
        beforeEach(function() {
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
            cy.get('#selectedKpi').should('not.be.visible')
            cy.get('#SideBar > :nth-child(3)').click()
            cy.get('#selectedKpi').should('be.visible')
            //cy.get('.Kpi_kpiIsSelected__1uwJJ').should("not.be.visible")
            //cy.get('.KpiCategory_categorySubBox__2WWTi > :nth-child(1)').click().should("be.visible")
            //cy.get('.Kpi_kpiIsSelected__1uwJJ').should("be.visible")
        })
        it("Test Multi-select", function(){
            cy.get('#SideBar > :nth-child(3)').click()
            cy.get('#multiSelect').click()
            
            
        })

    })
   
})

