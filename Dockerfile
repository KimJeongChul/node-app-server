FROM node:8-jessie
ADD app.js /app.js
ENTRYPOINT ["node", "app.js"]
