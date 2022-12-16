Feature: Stock tracker dashboard
  Scenario Outline: taking a look at the dashboard
    Given that I track many stocks
    When I visit the stock tracker home page
    Then I should see cards for the stocks I track

  Scenario Outline: taking a look at a card
    Given that I track "<stockSymbol>" stock
    When I visit the stock tracker home page
    Then I should see a card for stock "<stockSymbol>"
    Examples:
      | stockSymbol |
      | TSLA        |
      | GOOGL       |
      | AAPL        |

  Scenario Outline: taking a look at a stock data
    Given that I track "TEST" stock
    When I visit the stock tracker home page
    Then I should see a card for stock "TEST"
    And I should see data of the tracked stock

  Scenario Outline: taking a look at a stock trend
    Given that I track "TEST" stock
    When I visit the stock tracker home page
    Then I should see a card for stock "TEST"
    And I should see an arrow with the trend for the tracked stock

  Scenario Outline: removing a card
    Given that I track "<stockSymbol>" stock
    When I visit the stock tracker home page
    Then I should see a card for stock "<stockSymbol>"
    And I should see within the card a button to remove stock "<stockSymbol>" from tracked stocks
    When I click the button to remove the stock "<stockSymbol>" from tracked stocks
    Then The card for the stock "<stockSymbol>" should be removed from the dashboard
    Examples:
      | stockSymbol |
      | TSLA        |
      | GOOGL       |
      | AAPL        |
  Scenario Outline: going to stock sentiments page
    Given that I track "<stockSymbol>" stock
    When I visit the stock tracker home page
    Then I should see a card for stock "<stockSymbol>"
    And I should see within the card a button to navigate to stock "<stockSymbol>" sentiments page
    When I click the button to navigate to the stock "<stockSymbol>" sentiments page
    Then I should be on the stock "<stockSymbol>" sentiments page
    Examples:
      | stockSymbol |
      | TSLA        |
      | GOOGL       |
      | AAPL        |
