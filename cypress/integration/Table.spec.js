describe("UI Tests", function () {
    it( " load successfully", function (){
        cy.visit("http://localhost:3000/")
        
        // find first element by Creditor  Name
        cy.contains("CAPITAL ONE").click()
   
        // click on element containg "REMOVE DEPT"
        cy.contains("REMOVE DEBT").click() 
     
        //find children of the Table
        cy.get("table").children()

        
    })
      //List with first item
    it("Checks texts of table items", function () {
        cy
          .get("table")
          .eq(0)
          .should("contain.text", "Creditor");

        
    })
    
})