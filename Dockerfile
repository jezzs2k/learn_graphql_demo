#syntax=docker/dockerfile:1
FROM node:16.4.0
ENV NODE_ENV=production
ENV PORT=5000
# WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
EXPOSE 5000
COPY . .
CMD [ "node", "index.js" ]