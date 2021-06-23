describe('ui counter test', () => {
  const plusButtonClass = '.plus-button';
  const minusButtonClass = '.minus-button';
  const countDisplay = '.count-display';
  const checkCounter = (buttonClass, expectedValue) => {
      cy.get(buttonClass).click();
      cy.get(buttonClass).get(countDisplay).should('have.value', expectedValue);
  };

  it('check button rendered', function () {
    cy.visit('/').get('.counter');
  });

  it('check initial value 10', function () {
    cy.get(countDisplay).should('have.value', '10');
  });

  it('check plus button behavior', function () {
    checkCounter(plusButtonClass, '11');
    checkCounter(plusButtonClass, '12');
  });

  it('check minus button behavior', function () {
    cy.reload();
    checkCounter(minusButtonClass, '9');
    checkCounter(minusButtonClass, '8');
  });

  it('check plus button max value 12', function () {
    cy.reload();
    checkCounter(plusButtonClass, '11');
    checkCounter(plusButtonClass, '12');
    checkCounter(plusButtonClass, '12');
  });

  it('check minus button min value 8', function () {
    cy.reload();
    checkCounter(minusButtonClass, '9');
    checkCounter(minusButtonClass, '8');
    checkCounter(minusButtonClass, '8');
    checkCounter(minusButtonClass, '8');
  });
});
