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
Then(
  'I should see that the submit button is disabled, as the form input is empty',
  () => {
    cy.get('input').should('have.value', '');
    cy.get('#trackBtn').should('be.disabled');
  }
);

When('I fill the form input with {string}', (stockSymbol: string) => {
  cy.get('input').type(stockSymbol);
});
Then(
  'Form input should have {string} in uppercase as a value',
  (stockSymbol: string) => {
    cy.get('input').should('have.value', stockSymbol.toUpperCase());
  }
);
Then('I should see that the submit button is enabled', () => {
  cy.get('#trackBtn').should('be.enabled');
});
Then(
  'I should see that only {string} is kept as the input value',
  (firstFiveCharacters: string) => {
    cy.get('input').should('have.value', firstFiveCharacters);
  }
);

When('I submit the form', () => {
  cy.get('#trackBtn').click();
});
Then(
  'I should see a card that display the {string} stock informations',
  (stockSymbol: string) => {
    cy.get('.card-heading-text').should('contain.text', stockSymbol);
  }
);
