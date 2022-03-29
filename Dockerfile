FROM node:current-slim

# 작업 디렉토리 명시
WORKDIR app

# Docker 이미지 안에 앱 소스코드 복사
COPY . .
# package.json 모듈 설치
COPY package*.json .

# 실행될 command
RUN npm install

CMD ['echo', 'CMD test']
