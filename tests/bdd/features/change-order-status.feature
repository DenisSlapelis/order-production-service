Feature: Change order status
  Order receives a new status.

  Scenario: Valid order status
    Given PREPARATION
    When Order status is RECEIVED
    Then Should update order status to "PREPARATION"

  Scenario: Invalid order status
    Given PREPARATION
    When Order status is PREPARATION
    Then Should show an error message "Invalid status. You can't change status PREPARATION to PREPARATION."
