Feature: Stock tracker form
  Scenario: visiting the homepage
    When I visit the stock tracker home page
    Then I should see instructions on how to fill the form
  Scenario: filling and submitting the form
    When I visit the stock tracker home page
    And I fill the form with "TSLA"
    And I submit the form
    Then I should see a card that display the "TSLA" stock informations
