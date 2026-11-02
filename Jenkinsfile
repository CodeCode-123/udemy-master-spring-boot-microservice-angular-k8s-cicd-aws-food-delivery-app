pipeline {
  agent any

  tools {
    nodejs "Nodejs"
  }

  environment {
    DOCKER_REGISTRY = "docker.io"
    DOCKER_CREDENTIALS = credentials('DOCKER_HUB_CREDENTIAL')
    VERSION = "${env.BUILD_ID}"
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build Project') {
      steps {
        // Build the Angular project
        sh 'npm run build'
      }
    }

    stage('Docker Build and Push') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        sh 'docker build -t codecode123/food-delivery-app-fe-arm:${VERSION} .'
        sh 'docker push codecode123/food-delivery-app-fe-arm:${VERSION}'
      }
    }

    stage('Cleanup Workspace') {
      steps {
        deleteDir()
      }
    }

    stage('Update Image Tag in GitOps') {
      steps {
        checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'git-ssh', url: 'git@github.com:CodeCode-123/udemy-master-spring-boot-microservice-angular-k8s-cicd-aws.git']])
        script {
          // Set the new image tag with the Jenkins build number
          sh '''
            sed -i "s/image:./image: codecode123\\/food-delivery-app-fe-arm:${VERSION}/" aws/angular-manifest.yaml
            '''
          sh 'git checkout main'
          sh 'git add .'
          sh 'git commit -m "Update image tag"'
          sshagent(['git-ssh']) {
            sh('git push')
          }
        }
      }
    }
  }
}
