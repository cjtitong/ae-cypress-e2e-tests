# AE Cypress E2E Suite
Automation Exercise Cypress Test Suite

Table of Contents

Project Overview
Prerequisites
Project Structure
Installation
Running Tests
Page Object Model (POM)
Test Reports
CI/CD Integration
GitHub Actions
Jenkins
Best Practices


Project Overview

This project is a Cypress-based automation framework for the Automation Exercise website. It covers end-to-end test scenarios, including:

User registration and login flows
Product browsing by category and brand
Cart management and quantity updates
Checkout and payment workflows
Account management including deletion
Invoice download and verification
Search and recommendations

Key features include:

Fully modular POM-based design for maintainability and scalability
21 comprehensive test cases covering critical application workflows
Robust element handling using timeouts, force clicks, and modal handling
CI/CD-ready configuration for GitHub Actions and Jenkins
Detailed Mochawesome test reports


Prerequisites

To run the project locally, ensure you have the following installed:

Node.js ≥ 18
npm ≥ 9
Cypress ≥ 12
Git (for repository cloning)

Optional:

Jenkins server with Node.js installed
GitHub repository for CI/CD integration


Project Structure
cypress/
├─ e2e/
│  ├─ auth/               # User authentication tests
│  ├─ products/           # Product browsing tests
│  ├─ cart/               # Cart operations tests
│  ├─ checkout/           # Checkout and payment tests
├─ pages/                 # Page Object Model files
│  ├─ AccountPage.js      
│  ├─ AuthPage.js
│  ├─ CartPage.js
│  ├─ CheckoutPage.js
│  ├─ HomePage.js     
│  ├─ PaymentPage.js
│  ├─ ProductsPage.js
cypress.config.js         # Cypress configuration
package.json              # Project dependencies and scripts
README.md                 # Project documentation


Installation

#1. Clone the repository:

git clone https://github.com/cjtitong/automation-exercise-cypress.git
cd automation-exercise-cypress

#2. Install dependencies:

npm install

#3. Open Cypress Test Runner (optional):

npx cypress open


Running Tests

Run all tests in headless mode:

npx cypress run

Run tests from a specific folder:

npx cypress run --spec "cypress/e2e/auth/*.cy.js"

Run tests in interactive mode:

npx cypress open


Page Object Model (POM)

All pages follow the Page Object Model pattern for maintainability, modularity, and reusability.

Example usage:

import AuthPage from '../support/pageObjects/AuthPage';
const auth = new AuthPage();

// Register a new user
auth.fillSignupNameEmail('John Doe', 'john@example.com');
auth.submitSignup();
auth.fillAccountInformation(user);
auth.submitCreateAccount();
auth.clickContinueAfterAccountAction();


POM coverage:

AuthPage.js – Signup/Login flows
AccountPage.js – Account management and deletion
CartPage.js – Cart operations and quantity updates
CheckoutPage.js – Checkout process and invoice verification
PaymentPage.js – Payment workflows
ProductsPage.js – Product browsing, categories, brands, and reviews
HomePage.js, ContactPage.js, SubscriptionPage.js, TestCasesPage.js


Test Reports

Test execution generates Mochawesome reports:

#1. Merge reports:

npm run merge-reports

#2. Generate HTML report:

npx mochawesome-report-generator results/mochawesome/mochawesome.json

#3. Open report:
results/mochawesome/mochawesome.html


CI/CD Integration

GitHub Actions

Automates test execution on push or pull requests to the main branch.

Workflow file: .github/workflows/cypress.yml

name: Cypress Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx cypress run
      - run: npx mochawesome-merge results/mochawesome/*.json -o results/mochawesome/mochawesome.json
      - run: npx mochawesome-report-generator results/mochawesome/mochawesome.json
      - uses: actions/upload-artifact@v3
        with:
          name: mochawesome-report
          path: results/mochawesome/mochawesome.html

Jenkins

Prerequisites: Node.js installed on the Jenkins agent.

Pipeline example:

pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps { sh 'npm install' }
        }
        stage('Run Tests') {
            steps { sh 'npx cypress run' }
        }
        stage('Generate Report') {
            steps {
                sh 'npx mochawesome-merge results/mochawesome/*.json -o results/mochawesome/mochawesome.json'
                sh 'npx mochawesome-report-generator results/mochawesome/mochawesome.json'
            }
        }
        stage('Archive Report') {
            steps { archiveArtifacts artifacts: 'results/mochawesome/mochawesome.html' }
        }
    }
}


Best Practices

Use POM methods instead of raw selectors in test scripts
Apply timeouts and force clicks only when necessary
Modularize tests for reusability and parallel execution
Always clean up test data (e.g., delete accounts after checkout)
Generate and review reports for test validation and debugging