FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN inm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ['node', './dist/main.js']