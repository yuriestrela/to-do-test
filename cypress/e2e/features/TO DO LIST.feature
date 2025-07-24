Feature: Task Management

  Scenario: TC001 - Create a new task
    Given I am on the task page
    When I create a new task with the title "buy milk"
    Then the task "buy milk" should be added to the task list

  Scenario: TC002 - Mark a task as done
    Given I am on the task page
    And I create a new task with the title "buy milk"
    When I mark the task "buy milk" as done
    Then the task "buy milk" should be marked as done

  Scenario: TC003 - Delete a task
    Given I am on the task page
    And I create new tasks:
      | Task          |
      | buy milk      |
      | clean kitchen |
      | do homework   |
    When I delete the task "buy milk"
    Then the task "buy milk" should not be present in the task list
    And the task "clean kitchen" should be present in the task list
    And the task "do homework" should be present in the task list

  Scenario: TC004 - Edit a task
    Given I am on the task page
    And I create a new task with the title "buy milk"
    When I edit the task "buy milk" to "buy bread"
    Then the task "buy bread" should be added to the task list

  Scenario: TC005 - Select all tasks
    Given I am on the task page
    And I create new tasks:
      | Task          |
      | buy milk      |
      | clean kitchen |
      | do homework   |
    When I select all tasks
    Then all tasks should be marked as done

  Scenario: TC006 - Unselect all tasks
    Given I am on the task page
    And I create new tasks:
      | Task          |
      | buy milk      |
      | clean kitchen |
      | do homework   |
    When I select all tasks
    And I unselect all tasks
    Then no tasks should be marked as done
  # Bug

  Scenario: TC007 - Display correct remaining task count
    Given I am on the task page
    And I create new tasks:
      | Task          |
      | buy milk      |
      | clean kitchen |
      | do homework   |
    When I mark the task "buy milk" as done
    Then the task counter should display the correct amount of remaining tasks
  # Bug

  Scenario: TC008 - Clear completed tasks
    Given I am on the task page
    And I create new tasks:
      | Task          |
      | buy milk      |
      | clean kitchen |
      | do homework   |
    And I mark the task "buy milk" as done
    And I mark the task "do homework" as done
    When I clear completed tasks
    Then the task "buy milk" should not be present in the task list
    And the task "do homework" should not be present in the task list
    And the task "clean kitchen" should be present in the task list
  # UI/UX Suggestion:
  # The "Clear" button might be misleading. Since it only removes completed tasks, renaming it to "Clear completed" would improve usability and reduce confusion.

  Scenario: TC009 - View active tasks
    Given I am on the task page
    And I create new tasks:
      | Task           |
      | Buy milk       |
      | Walk dog       |
      | Study Cucumber |
    And I mark the task "Buy milk" as done
    When I go to active tasks
    Then I should see the following tasks:
      | Task           |
      | Walk dog       |
      | Study Cucumber |
    And the task "buy milk" should not be present in the task list

  Scenario: TC010 - View completed tasks
    Given I am on the task page
    And I create new tasks:
      | Task        |
      | Buy milk    |
      | Walk dog    |
      | Go shopping |
    And I mark the task "Buy milk" as done
    And I mark the task "Walk dog" as done
    When I go to completed tasks
    Then I should see the following tasks:
      | Task     |
      | Buy milk |
    And the task "Go shopping" should not be present in the task list

  Scenario: TC011 - View all tasks
    Given I am on the task page
    And I create new tasks:
      | Task        |
      | Buy milk    |
      | Walk dog    |
      | Go shopping |
    When I go to all tasks
    Then I should see the following tasks:
      | Task        |
      | Buy milk    |
      | Walk dog    |
      | Go shopping |

  Scenario: TC013 - Data persistence after reloading the page
    Given I am on the task page
    And I create new tasks:
      | Task           |
      | feed the cat   |
      | take out trash |
    When I reload the page
    Then I should see the following tasks:
      | Task           |
      | feed the cat   |
      | take out trash |

  Scenario: TC014 - Add task with empty title
    Given I am on the task page
    When I create a new task with the title ""
    Then the task "" should not be added to the task list

  Scenario: TC015 - Edit task to empty value
    Given I am on the task page
    And I create a new task with the title "buy milk"
    When I edit the task "buy milk" to ""
    Then the task "buy milk" should be present in the task list

  Scenario: TC016- Add task with leading/trailing spaces
    Given I am on the task page
    When I create a new task with the title "   feed the cat   "
    Then the task "feed the cat" should be added to the task list

  Scenario: TC017 - Toggle a single task multiple times
    Given I am on the task page
    And I create a new task with the title "walk the dog"
    When I mark the task "walk the dog" as done
    And I mark the task "walk the dog" as done
    Then the task "walk the dog" should be marked as not done

  Scenario: TC018 - Long task title
    Given I am on the task page
    When I create a new task with the title "a very long task title that exceeds normal expectations for length and contains multiple descriptions"
    Then the task titled "a very long task title that exceeds normal expectations for length and contains multiple descriptions" should be fully visible and not cut off in the task list
    #bug

  Scenario: TC019 - Switch filters and verify task visibility
    Given I am on the task page
    And I create new tasks:
      | Task   |
      | Task A |
      | Task B |
    And I mark the task "Task B" as done
    When I go to active tasks
    Then the task "Task A" should be present in the task list
    And the task "Task B" should not be present in the task list
    When I go to completed tasks
    Then the task "Task B" should be present in the task list
    And the task "Task A" should not be present in the task list
    When I go to all tasks
    Then I should see the following tasks:
      | Task   |
      | Task A |
      | Task B |

  Scenario: TC020 - Application should not trigger 404 requests on load
    Given I intercept network requests
    When I am on the task page
    Then the request to "/learn.json" should not return status "404"
    And the request to "/api" should not return status "404"
