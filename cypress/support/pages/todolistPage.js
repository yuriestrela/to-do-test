import 'cypress-real-events/support'

export class TodolistPage {

    visit() {
        cy.visit('/')
    }

    addTask(task) {
        cy.get(pageObjects.inputTask).type(`${task}{enter}`)
    }

    shouldAdd(task) {
        cy.get(pageObjects.addedTask).should('have.text', task)
    }

    shouldNotAdd() {
        cy.get(pageObjects.addedTask).should('not.exist')
    }


    markAsDone(task) {
        cy.get(pageObjects.addedTask)
            .contains(task)
            .parent()
            .find(pageObjects.doneButton)
            .click()
    }

    shouldDone(task) {
        cy.contains(task)
            .closest('.ng-scope')
            .should('have.class', 'completed')
    }

    shouldNotDone(task) {
        cy.contains(task)
            .closest('.ng-scope')
            .should('not.have.class', 'completed')
    }

    deleteTask(task) {
        cy.get(pageObjects.addedTask)
            .contains(task)
            .parent()
            .realHover()
            .find(pageObjects.deleteButton)
            .click()
    }

    shouldDeleted(task) {
        cy.get(pageObjects.taskList)
            .should('not.contain', task)
    }

    shouldBePresent(task) {
        cy.get(pageObjects.taskList)
            .should('contain', task)
    }

    editTask(task1, task2) {
        cy.contains(task1)
            .dblclick()

        cy.get(pageObjects.editInput)
            .should('be.visible')
            .clear()
            .type(`${task2}{enter}`)
    }

    toggleAll() {
        cy.get(pageObjects.toggleAllButton).click()
    }

    allDone() {
        cy.get(`${pageObjects.taskList} li`).each(($li) => {
            cy.wrap($li).should('have.class', 'completed')
        })
    }

    noneDone() {
        cy.get(`${pageObjects.taskList} li`).each(($li) => {
            cy.wrap($li).should('not.have.class', 'completed')
        })
    }

    taskCounter() {
        cy.get(pageObjects.taskItems).filter(':not(.completed)').then($tasks => {
            const expectedCount = $tasks.length;

            cy.get(pageObjects.taskCounter).should('have.text', expectedCount.toString());
        });
    }

    clearDone() {
        cy.get(pageObjects.clearDone).click()
    }

    goToActiveTasks() {
        cy.get(pageObjects.goToActiveTasks).click()
    }

    goToCompletedTasks() {
        cy.get(pageObjects.goToCompletedTasks).click()
    }

    goToAllTasks() {
        cy.contains('a', 'All').click()
    }

    reloadPage() {
        cy.reload()
    }

    checkWordWrapping(task) {
        cy.contains(task)
            .should('be.visible')
            .and('have.css', 'overflow-wrap', 'break-word')
            .and('have.css', 'white-space', 'normal')
    }

    shouldBeResponsive() {
        cy.get(pageObjects.inputTask).should('be.visible');
        cy.get(pageObjects.taskList).should('be.visible');
        cy.get(pageObjects.addedTask).should('be.visible');
    }

    narrowWidth() {
        cy.viewport(400, 800);
        this.visit()
    }

    checkResponsiveLayout() {
        cy.contains('To Do List')
            .should('be.visible')
            .then(($el) => {
                const el = $el[0];

                expect(el.scrollWidth).to.be.lessThan(el.clientWidth + 5);

                const computedStyle = getComputedStyle(el);
                expect(computedStyle.overflowWrap || computedStyle.wordWrap).to.be.oneOf(['break-word', 'anywhere']);
                expect(computedStyle.whiteSpace).to.not.equal('nowrap');
            });

        cy.get(pageObjects.inputTask).should('be.visible');
        cy.get(pageObjects.taskList).should('be.visible');
        cy.contains('items left').should('be.visible');
    }

    interceptRequests() {
        cy.intercept('GET', '/learn.json').as('getLearn');
        cy.intercept('GET', '/api').as('getApi');
    }

    shouldNotReturnStatus(api, status) {
        const alias = api.includes('learn') ? '@getLearn' : '@getApi';

        cy.wait(alias).its('response.statusCode').should('not.eq', parseInt(status));
    }
}

const pageObjects = {
    inputTask: 'input[class*="new-todo"]',
    taskList: 'ul.todo-list',
    addedTask: 'label[class="ng-binding"]',
    doneButton: 'input[class*="toggle ng"]',
    deleteButton: '.destroy',
    editInput: '.todo-list li.editing input.edit',
    toggleAllButton: 'label[for="toggle-all"]',
    inputToggleAll: '#toggle-all',
    taskItems: 'ul.todo-list li',
    taskCounter: 'strong[class="ng-binding"]',
    clearDone: '.clear-completed',
    goToActiveTasks: "a[ng-class=\"{selected: status == 'active'}\"]",
    goToCompletedTasks: "a[ng-class=\"{selected: status == 'completed'}\"]",
}