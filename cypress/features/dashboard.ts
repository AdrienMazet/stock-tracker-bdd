import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// check that list can display many items
// check that each card display title + stock symbol change, opening price, current price, high price
// check that each card as an arrow corresponding to change
// check that each card as a delete button that remove the card when clicked
// check that each card as a go to ... button that redirects to correct URL

Given(
  'that I track {string}, {string} and {string} stocks',
  async (stock1, stock2, stock3) => {
    cy.window().then((window) =>
      window.localStorage.setItem(
        'STOCKS',
        JSON.stringify([stock1, stock2, stock3])
      )
    );
  }
);
When('I visit the stock tracker home page', () => {
  cy.visit('http://localhost:4200');
});
Then(
  'I should see cards for {string}, {string} and {string} stocks',
  (stock1, stock2, stock3) => {
    cy.get('.card-heading-text').should('contain.text', stock1);
    cy.get('.card-heading-text').should('contain.text', stock2);
    cy.get('.card-heading-text').should('contain.text', stock3);
  }
);
