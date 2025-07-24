const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor");

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)]
      }));
      return config;
    },
    baseUrl: "https://todolist.james.am/#/",
    specPattern: "cypress/e2e/**/*.feature",
    stepDefinitions: "cypress/e2e/step_definitions/**/*.{js,ts}"
  }
});
