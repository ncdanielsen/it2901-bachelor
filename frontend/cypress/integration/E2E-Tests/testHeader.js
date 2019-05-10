context("Header Tests", () =>{

    describe("Test FAQ", function() {

        beforeEach(function() {
            cy.login()
            cy.visit("http://localhost:3000/faq/")
        })

        it("Click about, expects change in URL", function(){
            cy.visit("http://localhost:3000/home/")
            cy.get("div").contains("FAQ").click()
            cy.url().should("include", "/faq")
            
        })

    })

    describe("Test About", function() {

        beforeEach(function() {
            cy.login()
            cy.visit("http://localhost:3000/home/")
        })

        it("Click about, expects change in URL", function(){
            cy.get("div").contains("About").click()
            cy.url().should("include", "/about")

        })

        it("Check About Title", function(){
            cy.visit("http://localhost:3000/about/")
            cy.contains("About")
        })

    })

    describe("Test Profile", function() {

        beforeEach(function() {
            cy.login()
            cy.visit("http://localhost:3000/home/")
        })

        it("Click profile, expects change in URL", function(){
            cy.get("div").contains("Profile").click()
            cy.url().should("include", "/profile")

        })

    })

    describe("Test Home buttons", function() {

        beforeEach(function() {
            cy.login()
            cy.visit("http://localhost:3000/about")
            cy.url().should("include", "/about")
        })

        it("Starts on About page. Checks if ZEN logo is visible", function(){
            cy.get("div").find("img[alt='zen logo']").should('be.visible')

        })

        it("Starts on About page. Checks if FME logo is visible", function(){
            cy.get("div").find("img[alt='fme logo']").should('be.visible')

        })

        it("Starts on About page. Click ZEN logo, expect to be brought to home. Checks URL", function(){
            cy.get("div").find("img[alt='zen logo']").click()
            cy.url().should("include", "/home")

        })

        it("Starts on About page. Click FME logo, expect to be brought to home. Checks URL", function(){
            cy.get("div").find("img[alt='fme logo']").click()
            cy.url().should("include", "/home")

        })

    })
})
