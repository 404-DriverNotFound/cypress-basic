describe('UI counter', () => {
  const plusButtonClass = '.plus-button';
  const minusButtonClass = '.minus-button';
  const countDisplay = '.count-display';
  const checkCounter = (buttonClass, expectedValue) => {
    cy.get(buttonClass).click()
      .get(countDisplay).should('have.value', expectedValue);
  };

  it('renders button', function () {
    cy.visit('/').get('.counter');
  });

  it('initialize input value with 10', function () {
    cy.get(countDisplay).should('have.value', '10');
  });

  it('increases value by 1 when plus-button clicked', function () {
    checkCounter(plusButtonClass, '11');
    checkCounter(plusButtonClass, '12');
  });

  it('decreases value by 1 when minus-button clicked', function () {
    cy.reload();
    checkCounter(minusButtonClass, '9');
    checkCounter(minusButtonClass, '8');
  });

  it('doesn\'t increase value over 12', function () {
    cy.reload();
    checkCounter(plusButtonClass, '11');
    checkCounter(plusButtonClass, '12');
    checkCounter(plusButtonClass, '12');
  });

  it('doesn\'t decrease value under 8', function () {
    cy.reload();
    checkCounter(minusButtonClass, '9');
    checkCounter(minusButtonClass, '8');
    checkCounter(minusButtonClass, '8');
    checkCounter(minusButtonClass, '8');
  });
});
