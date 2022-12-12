import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I visit the stock tracker home page', () => {
  cy.visit('http://localhost:4200');
});
Then('I should see instructions on how to fill the form', () => {
  cy.get('p').should(
    'have.text',
    'Enter the symbol of a stock to track (i.e. AAPL, TSLA, GOOGL)'
  );
});

When('I fill the form with {string}', (stockSymbol: string) => {
  cy.get('input').type(stockSymbol);
});
When('I submit the form', () => {
  cy.get('#trackBtn').click();
});
Then(
  'I should see a card that display the {string} stock informations',
  (stockSymbol: string) => {
    cy.get('.card-heading-text').should('contain.text', stockSymbol);
  }
);
