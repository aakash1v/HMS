pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "hms"
  }

  stages {
    stage('📥 Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/aakash1v/HMS.git'
      }
    }

    stage('🐳 Build and Start Services') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose build'
        sh 'docker-compose up -d'
      }
    }

    stage('🛠 Run Migrations') {
      steps {
        sh 'docker-compose exec web python manage.py migrate'
      }
    }

    // Optional
    stage('🧪 Run Django Tests') {
      steps {
        sh 'docker-compose exec web python manage.py test'
      }
    }
  }

  post {
    failure {
      echo "❌ Pipeline failed"
    }
    success {
      echo "✅ Deployed successfully!"
    }
  }
}

