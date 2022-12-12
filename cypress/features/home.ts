import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I visit the stock tracker home page', () => {
  cy.visit('http://localhost:4200');
});
Then('I should see the name of the application', () => {
  cy.get('h1').should('have.text', 'STOCK TRACKER');
});
