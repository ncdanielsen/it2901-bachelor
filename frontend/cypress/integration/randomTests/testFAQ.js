context("FAQ Tests", () =>{
    describe("Test FAQ", function() {
    
        beforeEach(function() {
            cy.visit("http://localhost:3000/Faq/")
        })
    
        it("Click about, expects change in URL", function(){
            cy.visit("http://localhost:3000/home/")
            cy.get("div").contains("FAQ").click()
            cy.url().should("include", "/Faq")
            
        })
    
    })
})

