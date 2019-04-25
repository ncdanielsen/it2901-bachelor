context("About Tests", () =>{
    describe("Test About", function() {
    
        beforeEach(function() {
            cy.visit("http://localhost:3000/home/")
        })

        it("Click about, expects change in URL", function(){
            cy.get("div").contains("About").click()
            cy.url().should("include", "/about")
            
        })
    
    })
    
})

