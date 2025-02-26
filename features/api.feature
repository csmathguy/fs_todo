Feature: ToDo API

  Scenario: GET /api/todos returns a list of todos
    When I send a GET request to "/api/todos"
    Then the response should contain "Buy groceries"
    And the response should contain "Complete project"
