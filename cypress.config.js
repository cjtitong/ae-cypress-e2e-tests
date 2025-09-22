const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    retries: { runMode: 1, openMode: 0 },
  },
  // Default reporter: Mochawesome
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "results/mochawesome",
    overwrite: false,
    html: false,
    json: true
  }
});
