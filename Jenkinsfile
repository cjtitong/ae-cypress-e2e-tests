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

    triggers {
        // Trigger build on GitHub push / webhook events
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code from GitHub..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "Running Cypress tests..."
                sh 'npm run test:ci'
            }
        }
    }

    post {
        always {
            echo "Archiving test results and artifacts..."

            // JUnit results for Jenkins
            junit allowEmptyResults: true, testResults: 'results/*.xml'

            // Cypress artifacts
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/downloads/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'results/*.xml', allowEmptyArchive: true

            // Mochawesome HTML reports
            archiveArtifacts artifacts: 'results/mochawesome/html/**', allowEmptyArchive: true

            // Publish Mochawesome HTML report
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
