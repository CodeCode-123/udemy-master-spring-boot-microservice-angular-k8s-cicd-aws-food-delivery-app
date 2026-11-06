pipeline {
  agent any

  tools {
    nodejs "Nodejs"
  }

  environment {
    DOCKER_REGISTRY = "docker.io"
    VERSION = "${env.BUILD_ID}"
    PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:${env.PATH}"
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker --version'
      }
    }

    stage('Install Dependencies') {
      steps {
        // Intall dependencies
        sh 'npm ci'
      }
    }

    stage('Build Project') {
      steps {
        // Build the Angular project
        sh 'npm run build'
      }
    }

    stage('Login to Docker Hub') {
      steps {
        // 'docker-hub-credentials' matches the ID you created in Jenkins
        withCredentials([usernamePassword(
            credentialsId: 'DOCKER_HUB_CREDENTIAL',
            usernameVariable: 'USER',
            passwordVariable: 'PASS'
        )]) {
            // Log in securely using stdin to prevent credentials leaking in process lists
            sh 'echo "$PASS" | docker login -u "$USER" --password-stdin'
            }
      }
    }

    stage('Docker Build and Push') {
      steps {
        sh 'docker build -t codecode123/food-delivery-app-fe-arm-cicd:${VERSION} .'
        sh 'docker push codecode123/food-delivery-app-fe-arm-cicd:${VERSION}'
      }
    }

    stage('Cleanup Workspace') {
      steps {
        deleteDir()
      }
    }

    stage('Update Image Tag in GitOps') {
      steps {
        // Change context to the folder containing the deployment manifest files
        dir('../deployment') {
            checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'git-ssh', url: 'git@github.com:CodeCode-123/udemy-master-spring-boot-microservice-angular-k8s-cicd-aws-deployment.git']])
            sshagent(['git-ssh']) {
                // Set the new image tag with the Jenkins build number
                sh '''
                  sed -i '' "s/image:.*/image: codecode123\\/food-delivery-app-fe-arm-cicd:${VERSION}/g" angular-manifest.yaml
                '''
                sh 'git stash'
                sh 'git checkout main'
                sh 'git stash pop'
                sh 'git add angular-manifest.yaml'
                sh 'git commit -m "Update image tag [skip ci]" || true'
                sh 'git push origin HEAD:main'
              }
        }
      }
    }
  }
}
