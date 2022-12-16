import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import * as quote from '../fixtures/stocks/quote.json';
import * as search from '../fixtures/stocks/search.json';

Given('that I track many stocks', async () => {
  cy.window().then((window) =>
    window.localStorage.setItem(
      'STOCKS',
      JSON.stringify(['TSLA', 'GOOGL', 'AAPL'])
    )
  );
});
Given('that I track {string} stock', async (stockSymbol) => {
  if (stockSymbol === 'TEST') {
    cy.intercept('GET', 'https://finnhub.io/api/v1/quote?symbol=TEST*', {
      statusCode: 200,
      body: quote,
    });
    cy.intercept('GET', 'https://finnhub.io/api/v1/search?q=TEST*', {
      statusCode: 200,
      body: search,
    });
  }
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

When(
  'I click the button to navigate to the stock {string} sentiments page',
  (stockSymbol) => {
    cy.get(`#sentiment${stockSymbol}`).click();
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

Then('I should see data of the tracked stock', () => {
  cy.get('.card-heading-text').should(
    'have.text',
    ` ${search.result[0].description} (${search.result[0].displaySymbol}) `
  );
  // TODO : link the following assertions to fixture values
  cy.get('.card-content > :nth-child(1)').should(
    'have.text',
    ' Change today : +55% '
  );
  cy.get('.card-content > :nth-child(2)').should(
    'have.text',
    'Current price : $157.67'
  );
  cy.get('.card-content > :nth-child(4)').should(
    'have.text',
    'Opening price : $153.44'
  );
  cy.get('.card-content > :nth-child(5)').should(
    'have.text',
    'High price : $160.93'
  );
});

Then('I should see an arrow with the trend for the tracked stock', () => {
  cy.get('.current-trend-arrow')
    .should('have.attr', 'src')
    .should('include', quote.dp > 0 ? 'Arrow_Up' : 'Arrow_Down');
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

Then(
  'I should see within the card a button to navigate to stock {string} sentiments page',
  (stockSymbol) => {
    cy.get(`#sentiment${stockSymbol}`).should('be.visible');
  }
);

Then('I should be on the stock {string} sentiments page', (stockSymbol) => {
  cy.url().should('include', `/sentiment/${stockSymbol}`);
});
