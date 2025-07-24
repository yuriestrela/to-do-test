import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { TodolistPage } from "../../support/pages/todolistPage";
const Todolist = new TodolistPage() 

Given('I am on the task page', () => {
    Todolist.visit()
})

When('I create a new task with the title {string}', (task) => {
    Todolist.addTask(task)
})

Then('the task {string} should be added to the task list', (task) => {
    Todolist.shouldAdd(task)
})

Then('the task "" should not be added to the task list', () => {
    Todolist.shouldNotAdd()
})

When('I mark the task {string} as done', (task) => {
    Todolist.markAsDone(task)
})

Then('the task {string} should be marked as done', (task) => {
    Todolist.shouldDone(task)
})

When('I delete the task {string}', (task) => {
    Todolist.deleteTask(task)
})

Then('the task {string} should not be present in the task list', (task) => {
    Todolist.shouldDeleted(task)
})

When('I edit the task {string} to {string}', (task1, task2) => {
    Todolist.editTask(task1, task2)
})

When('I select all tasks', () => {
    Todolist.toggleAll()
})

Then('all tasks should be marked as done', () =>{
    Todolist.allDone()
})

When('I unselect all tasks', () => {
    Todolist.toggleAll()
})

Then('no tasks should be marked as done', () => {
    Todolist.noneDone()
})

Then('the task counter should display the correct amount of remaining tasks', () => {
    Todolist.taskCounter()
})

When('I create new tasks:', (dataTable) => {
    dataTable.hashes().forEach(row => {
        Todolist.addTask(row.Task)
    })
})

When('I clear completed tasks', () => {
    Todolist.clearDone()
})

Then('the task {string} should be present in the task list', (task) => {
    Todolist.shouldBePresent(task)
})

When('I go to active tasks', () => {
    Todolist.goToActiveTasks()
})

Then('I should see the following tasks:', (dataTable) => {
    dataTable.hashes().forEach(row => {
        Todolist.shouldBePresent(row.Task)
    })
})

When('I go to completed tasks', () => {
    Todolist.goToCompletedTasks()
})

When('I go to all tasks', () => {
    Todolist.goToAllTasks()
})

When('I reload the page', () => {
    Todolist.reloadPage()
})

Then('the task {string} should be marked as not done', (task) => {
    Todolist.shouldNotDone(task)
})

Then('the task titled {string} should be fully visible and not cut off in the task list', (task) => {
    Todolist.checkWordWrapping(task)
})

When('I resize the browser to a narrow width', () => {
    Todolist.narrowWidth()
})

Then('the layout should be responsive and visually correct', () => {
    Todolist.checkResponsiveLayout()
})

Given('I intercept network requests', () => {
    Todolist.interceptRequests()
});

Then('the request to {string} should not return status {string}', (api, status) => {
  Todolist.shouldNotReturnStatus(api, status);
});
