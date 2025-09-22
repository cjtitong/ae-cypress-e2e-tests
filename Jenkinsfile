pipeline {
  agent {
    docker {
      image 'cypress/included:15.2.0'
      args '--shm-size=2g'
    }
  }

  environment {
    CYPRESS_baseUrl = 'https://automationexercise.com'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        // Runs Cypress tests + merges + generates Mochawesome HTML
        sh 'npm run test:ci'
      }
    }
  }

  post {
    always {
      // JUnit reports for Jenkins test result view
      junit allowEmptyResults: true, testResults: 'results/*.xml'

      // Archive Cypress artifacts
      archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'results/*.xml', allowEmptyArchive: true
      archiveArtifacts artifacts: 'cypress/downloads/**', allowEmptyArchive: true

      // Archive Mochawesome HTML folder
      archiveArtifacts artifacts: 'results/mochawesome/html/**', allowEmptyArchive: true

      // Publish Mochawesome HTML report (requires HTML Publisher plugin)
      publishHTML(target: [
        reportDir: 'results/mochawesome/html',
        reportFiles: 'mochawesome.html',
        reportName: 'Mochawesome Report',
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
      ])
    }
  }
}
