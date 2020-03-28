pipeline {
  agent any
  environment {
    ENTERPRISE = "yungeeker"
    PROJECT = "cflsgx"
    ARTIFACT = "backend"
    CODE_DEPOT = "backend"
    
    ARTIFACT_BASE = "${ENTERPRISE}-docker.pkg.coding.net"
    ARTIFACT_IMAGE="${ARTIFACT_BASE}/${PROJECT}/${ARTIFACT}/${CODE_DEPOT}"
  }
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], 
                            userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
    stage('安装依赖') {
      steps {
        sh 'curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -'
        sh 'apt install -y nodejs'
        sh 'npm install'
      }
    }
    stage('单元测试') {
      steps {
        sh 'npm test'
      }
    }
    stage('依赖漏洞扫描') {
      steps {
        sh 'npm audit'
      }
    }
    stage('打包镜像') {
      steps {
		sh "docker build -t ${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF} ."
        sh "docker tag ${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF} ${ARTIFACT_IMAGE}:latest"
      }
    }
    stage('推送到制品库') {
      steps {
		script {
          docker.withRegistry("https://${ARTIFACT_BASE}", "${env.DOCKER_REGISTRY_CREDENTIALS_ID}") {
            docker.image("${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF}").push()
       		docker.image("${ARTIFACT_IMAGE}:latest").push()
          }
        }
      }
    }
  }
}