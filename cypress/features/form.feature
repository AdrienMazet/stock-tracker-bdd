Feature: Stock tracker form
  Scenario: visiting the homepage
    When I visit the stock tracker home page
    Then I should see instructions on how to fill the form
    And I should see that the submit button is disabled, as the form input is empty
  Scenario Outline: filling the form
    When I visit the stock tracker home page
    And I fill the form input with "<stockSymbol>"
    Then Form input should have "<stockSymbol>" in uppercase as a value
    And I should see that the submit button is enabled
    Examples:
      | stockSymbol |
      | tsla        |
      | GoogL       |
      | aAPl        |
  Scenario Outline: filling the form with long inputs
    When I visit the stock tracker home page
    And I fill the form input with "<longStockSymbol>"
    Then I should see that only "<firstFiveCharacters>" is kept as the input value
    Examples:
      | longStockSymbol | firstFiveCharacters |
      | TLSLAXOZFE      | TLSLA               |
      | GOOGLELALDZ     | GOOGL               |
      | AAAPLAAA        | AAAPL               |
  Scenario Outline: filling and submitting the form
    When I visit the stock tracker home page
    And I fill the form input with "<stockSymbol>"
    And I submit the form
    Then I should see a card that display the "<stockSymbol>" stock informations
    Examples:
      | stockSymbol |
      | TSLA        |
      | GOOGL       |
      | AAPL        |
