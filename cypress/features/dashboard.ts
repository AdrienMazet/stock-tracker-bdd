import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// check that each card display title + stock symbol change, opening price, current price, high price
// check that each card as an arrow corresponding to change
// check that each card as a go to ... button that redirects to correct URL
Given('that I track many stocks', async () => {
  cy.window().then((window) =>
    window.localStorage.setItem(
      'STOCKS',
      JSON.stringify(['TSLA', 'GOOGL', 'AAPL'])
    )
  );
});
Given('that I track {string} stock', async (stockSymbol) => {
  cy.window().then((window) =>
    window.localStorage.setItem('STOCKS', JSON.stringify([stockSymbol]))
  );
});

When('I visit the stock tracker home page', () => {
  cy.visit('http://localhost:4200');
});

When(
  'I click the button to remove the stock {string} from tracked stocks',
  (stockSymbol) => {
    cy.get(`#remove${stockSymbol}`).click();
  }
);

Then('I should see cards for the stocks I track', () => {
  cy.get('#cardTSLA').should('be.visible');
  cy.get('#cardGOOGL').should('be.visible');
  cy.get('#cardAAPL').should('be.visible');
});

Then('I should see a card for stock {string}', (stockSymbol) => {
  cy.get(`#card${stockSymbol}`).should('be.visible');
});

Then(
  'I should see within the card a button to remove stock {string} from tracked stocks',
  (stockSymbol) => {
    cy.get(`#remove${stockSymbol}`).should('be.visible');
  }
);

Then(
  'The card for the stock {string} should be removed from the dashboard',
  (stockSymbol: string) => {
    cy.get(`card${stockSymbol}`).should('not.exist');
  }
);
