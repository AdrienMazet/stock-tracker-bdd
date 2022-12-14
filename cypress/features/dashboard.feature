Feature: Stock tracker dashboard
  Scenario: taking a look at the dashboard
    Given that I track "TSLA", "GOOGL" and "AAPL" stocks
    When I visit the stock tracker home page
    Then I should see cards for "TSLA", "GOOGL" and "AAPL" stocks

