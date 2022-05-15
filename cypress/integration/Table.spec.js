describe("UI Tests", function () {
  it( " load successfully", function (){
      cy.visit("http://localhost:3000/")
  })

  it("Checks if table is not empty", function () {
      cy.get('#creditors_table').find('tbody>tr').should('have.length.greaterThan', 0)
  })


  it("Checks adding new row", function () {
      cy.get('#creditors_table').find('tbody>tr').its('length').then((val)=>{
          console.log('before',val);
          cy.get('#add_row_btn').click();
          cy.get('#creditors_table').find('tbody>tr').should('have.length', val+1);
      })
  })

  it("Checks removing last row", function () {
      cy.get('#creditors_table').find('tbody>tr').its('length').then((val)=>{
          console.log('before',val);
          cy.get('#remove_row_btn').click();
          cy.get('#creditors_table').find('tbody>tr').should('have.length', val-1);
      })
  })


  it("Checks number of checked rows", function () {
      cy.get('#total_rows_label').should('have.text', '0');
      cy.get('#creditors_table').find('[type="checkbox"]').first().check();
      cy.get('#total_rows_label').should('have.text', '1');
      cy.get('#creditors_table').find('[type="checkbox"]').first().uncheck();
      cy.get('#total_rows_label').should('have.text', '0');
  })
  
})