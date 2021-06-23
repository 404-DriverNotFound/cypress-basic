describe('Counter module', () => {
  it('renders components', () => {
    cy.visit('/');
    cy.get('.container > h1').contains('ui counter');
    cy.get('.minus-button').contains('-');
    cy.get('.plus-button').contains('+');
    cy.get('.count-display').should('have.value', 10);
  });

  it('increases count value when click plus-button', () => {
    cy.reload();
    cy.get('.count-display').should('have.value', 10);
    cy.get('.plus-button').click()
      .get('.count-display').should('have.value', 11);
    cy.get('.plus-button').click()
      .get('.count-display').should('have.value', 12);
  });

  it('doesn\'t increase over 12', () => {
    cy.get('.plus-button').click()
      .get('.count-display').should('have.value', 12);
    cy.get('.plus-button').click().click().click()
      .get('.count-display')
      .should('have.value', 12);
  });

  it('decreases count value when click minus-button', () => {
    cy.reload();
    cy.get('.count-display').should('have.value', 10);
    cy.get('.minus-button').click()
      .get('.count-display').should('have.value', 9);
    cy.get('.minus-button').click()
      .get('.count-display').should('have.value', 8);
  });

  it('doesn\'t decrease over 8', () => {
    cy.get('.minus-button').click()
      .get('.count-display').should('have.value', 8);
    cy.get('.minus-button').click().click().click()
      .get('.count-display')
      .should('have.value', 8);
  });
});
